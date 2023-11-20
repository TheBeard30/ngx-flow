import { Injectable } from '@angular/core';
import { XFlowEdgeCommands } from '@/app/flow-core/constants';
import { CmdContext } from '@/app/flow-core/commands';
import { NsGraph } from '@/app/flow-core/interfaces';
import { Edge, Model } from '@antv/x6';
import { IArgsBase } from '@/app/flow-core/commands/interface';
import { HookHub } from '@/app/flow-core/hooks/hookhub';
import { IHooks } from '@/app/flow-core/hooks/interface';

@Injectable({
  providedIn: 'root'
})
export class AddEdgeCommand {
  token = XFlowEdgeCommands.ADD_EDGE.id;

  ctx: CmdContext<NsAddEdge.IArgs, NsAddEdge.IResult, NsAddEdge.ICmdHooks>;

  /** 处理edgeConfig的兜底逻辑 */
  processEdgeConfig = async (args: NsAddEdge.IArgs, edge: NsGraph.IEdgeConfig) => {
    /** 处理edgeConfig没有返回id的问题 */
    if (!edge.id) {
      const { createIdService = NsAddEdge.createEdgeId } = args;
      edge.id = await createIdService(edge);
    }
    /** 处理xflow edge 和x6 edge的字段差异  */
    if (edge.sourcePortId && !edge.sourcePort) {
      edge.sourcePort = edge.sourcePortId;
      edge.targetPort = edge.targetPortId;
    }
    return edge;
  };

  execute = async () => {
    const { args, hooks: runtimeHook } = this.ctx.getArgs();
    const hooks = this.ctx.getHooks();
    await hooks.addEdge.call(
      args,
      async handlerArgs => {
        const { cellFactory, createEdgeService, commandService, options } = handlerArgs;
        const graph = await this.ctx.getX6Graph();
        let rawEdge: NsGraph.IEdgeConfig = handlerArgs.edgeConfig;
        // 通过createEdgeService来获取 id/是否可以添加的信息，如果返回的nodeid为空则不添加到画布
        if (createEdgeService) {
          const res = await createEdgeService(handlerArgs);
          if (typeof res === 'boolean') {
            return { err: 'createEdgeService rejected' };
          }
          rawEdge = res;
        }
        const edgeConfig = await this.processEdgeConfig(handlerArgs, rawEdge);
        let edgeCell: Edge;
        const eventOptions = { ...options, isCommand: true };
        if (cellFactory) {
          const cell = await cellFactory(edgeConfig, this);
          edgeCell = graph.addEdge(cell, eventOptions);
        } else {
          edgeCell = graph.addEdge(
            {
              ...edgeConfig,
              /** 由于X6的实现是React节点挂在label上的, 所以必须要给label设置值 */
              label: edgeConfig?.label || edgeConfig,
              data: { ...edgeConfig }
            },
            eventOptions
          );
        }
        return { edgeConfig: edgeConfig, edgeCell };
      },
      runtimeHook
    );
  };
}

export namespace NsAddEdge {
  export interface IX6EdgePlainConfig {
    sourceCell?: string;
    sourcePort?: string;
    targetCell?: string;
    targetPort?: string;
  }
  export interface IX6EdgeObjectConfig {
    source: { cell: string; port: string };
    target: { cell: string; port: string };
  }

  /** Command: 用于注册named factory */
  export const command = XFlowEdgeCommands.ADD_EDGE;
  /** hookName */
  export const hookKey = 'addEdge';

  /** hook 参数类型 */
  export interface IArgs extends IArgsBase {
    /** 边的元数据 */
    edgeConfig: NsGraph.IEdgeConfig;
    /** X6 Model Options：https://x6.antv.vision/zh/docs/api/graph/model/#addnode */
    options?: Model.AddOptions;
    /** cell的工厂方法 */
    cellFactory?: IEdgeCellFactory;
    /** 创建 edge id的方法（可选） */
    createIdService?: ICreateEdgeIdService;
    /** 创建 edgeCell 的方法 */
    createEdgeService?: ICreateEdgeService;
  }

  /** hook handler 返回类型 */
  export interface IResult {
    /** err */
    err?: string;
    /** 元数据 */
    edgeConfig?: NsGraph.IEdgeConfig;
    /** edge的x6实例 */
    edgeCell?: Edge;
  }
  /** edge id 类型 */
  export const createEdgeId = (edge: NsGraph.IEdgeConfig) => {
    if (typeof edge.source == 'string') {
      return `${edge.source}:${edge.sourcePortId}-${edge.target}:${edge.targetPortId}`;
    }
    if (isX6EdgeConfig(edge)) {
      const x6EdgeConfig: IX6EdgeObjectConfig = edge;
      return `${x6EdgeConfig.source.cell}:${x6EdgeConfig.source.port}-${x6EdgeConfig.target.cell}:${x6EdgeConfig.target.port}`;
    }
    if (isX6EdgePlainConfig(edge)) {
      const x6EdgeConfig: IX6EdgePlainConfig = edge;
      return `${x6EdgeConfig.sourceCell}:${x6EdgeConfig.sourcePort}-${x6EdgeConfig.targetCell}:${x6EdgeConfig.targetPort}`;
    }
    return '';
  };
  export function isX6EdgeConfig(edge: any): edge is IX6EdgeObjectConfig {
    return edge.source && edge.source.cell && typeof edge.source.cell == 'string';
  }
  export function isX6EdgePlainConfig(edge: any): edge is IX6EdgePlainConfig {
    return edge.sourceCell && typeof edge.sourceCell == 'string';
  }
  export interface ICreateEdgeService {
    (args: IArgs): Promise<NsGraph.IEdgeConfig | boolean>;
  }
  export interface ICreateEdgeIdService {
    (edgeConfig: NsGraph.IEdgeConfig): Promise<string>;
  }
  export interface IEdgeCellFactory {
    (args: NsGraph.IEdgeConfig, self: AddEdgeCommand): Promise<Edge>;
  }
  /** hooks 类型 */
  export interface ICmdHooks extends IHooks {
    addEdge: HookHub<IArgs, IResult>;
  }
}
