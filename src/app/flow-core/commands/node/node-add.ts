import { Injectable } from '@angular/core';
import { CmdContext } from '@/app/flow-core/commands';
import { XFlowNodeCommands } from '@/app/flow-core/constants';
import { NsGraph } from '@/app/flow-core/interfaces';
import { Model, Node } from '@antv/x6';
import { HookHub } from '@/app/flow-core/hooks/hookhub';
import { IHooks } from '@/app/flow-core/hooks/interface';
import { IArgsBase } from '@/app/flow-core/commands/interface';

@Injectable({
  providedIn: 'root'
})
export class AddNodeCommand {
  token: string = XFlowNodeCommands.ADD_NODE.id;
  // 需要一个上下文
  ctx: CmdContext<NsAddNode.IArgs, NsAddNode.IResult, NsAddNode.ICmdHooks>;

  execute = async () => {
    const { args, hooks: runtimeHook } = this.ctx.getArgs();
    const hooks = this.ctx.getHooks();
    await hooks.addNode.call(
      args,
      async handlerArgs => {
        const { createNodeService, cellFactory, commandService, options } = handlerArgs;
        const graph = await this.ctx.getX6Graph();
        let rawNode: NsGraph.INodeConfig = handlerArgs.nodeConfig;
        // 通过createNodeService来获取诸如nodeId的信息，如果返回的nodeid为空则不添加到画布
        if (createNodeService) {
          const res = await createNodeService(handlerArgs);
          if (typeof res === 'boolean') {
            return { err: 'createNodeService rejected' };
          }
          rawNode = res;
        }
        const nodeConfig = await this.processNodeConfig(rawNode);

        let x6NodeCell: Node;
        const eventOptions = { ...options, isCommand: true };
        if (cellFactory) {
          /** 使用参数中的工厂方法 */
          const cell = await cellFactory(nodeConfig, this);
          x6NodeCell = graph.addNode(cell, eventOptions);
        } else {
          x6NodeCell = graph.addNode(nodeConfig, eventOptions);
        }
        return { nodeConfig: nodeConfig, nodeCell: x6NodeCell };
      },
      runtimeHook
    );
  };

  processNodeConfig = async (nodeConfig: NsGraph.INodeConfig) => {
    /**
     * 1. react shape node 逻辑
     * 2. X6不会处理data数据, 仅透传。可以通过x6Node?.getData()方法获取这份数据
     */
    nodeConfig.data = { ...nodeConfig };

    /** 非 react shape */
    if (nodeConfig.shape) {
      return nodeConfig;
    }
    return nodeConfig;
  };
}

export namespace NsAddNode {
  /** Command: 用于注册named factory */
  export const command = XFlowNodeCommands.ADD_NODE;
  /** hookName */
  export const hookKey = 'addNode';

  /** hook 参数类型 */
  export interface IArgs extends IArgsBase {
    /** 节点的元数据 */
    nodeConfig: NsGraph.INodeConfig;
    /** X6 Model Options：https://x6.antv.vision/zh/docs/api/graph/model/#addnode */
    options?: Model.AddOptions;
    /** 创建X6 Node Cell的工厂方法 */
    cellFactory?: INodeCellFactory;
    /** 创建Node的服务 */
    createNodeService?: ICreateNodeService;
  }

  /** add node api service 类型 */
  export interface ICreateNodeService {
    (args: IArgs): Promise<NsGraph.INodeConfig | boolean>;
  }

  /** 创建X6 Node Cell的工厂方法 */
  export interface INodeCellFactory {
    (args: NsGraph.INodeConfig, self: AddNodeCommand): Promise<Node>;
  }

  /** hooks 类型 */
  export interface ICmdHooks extends IHooks {
    addNode: HookHub<IArgs, IResult>;
  }

  /** hook handler 返回类型 */
  export interface IResult {
    err?: string;
    /** 节点的元数据 */
    nodeConfig?: NsGraph.INodeConfig;
    /** X6的Cell */
    nodeCell?: Node;
  }
}
