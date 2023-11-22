import { Injectable } from '@angular/core';
import { XFlowEdgeCommands } from '@/app/flow-core/constants';
import { CmdContext } from '@/app/flow-core/commands';
import { Edge } from '@antv/x6';
import { IArgsBase } from '@/app/flow-core/commands/interface';
import { NsGraph } from '@/app/flow-core/interfaces';
import { IHooks } from '@/app/flow-core/hooks/interface';
import { HookHub } from '@/app/flow-core/hooks/hookhub';
import { isBoolean, isObject } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class UpdateEdgeCommand {
  token: string = XFlowEdgeCommands.UPDATE_EDGE.id;

  ctx: CmdContext<NsUpdateEdge.IArgs, NsUpdateEdge.IResult, NsUpdateEdge.ICmdHooks>;

  execute = async () => {
    const { args, hooks: runtimeHook } = this.ctx.getArgs();
    const hooks = this.ctx.getHooks();
    await hooks.updateEdge.call(
      args,
      async handlerArgs => {
        const x6Graph = await this.ctx.getX6Graph();
        const {
          updateEdgeService,
          updateEdgeLabelService = NsUpdateEdge.XFlowUpdateLabelService,
          options = NsUpdateEdge.XFlowEdgeSetOptions
        } = handlerArgs;
        const edgeConfig = updateEdgeService ? await updateEdgeService(handlerArgs) : handlerArgs?.edgeConfig;

        const x6Edge = x6Graph?.getCellById(edgeConfig?.id) as Edge;
        x6Edge?.setData(edgeConfig, options);
        // eslint-disable-next-line no-prototype-builtins
        if (edgeConfig?.hasOwnProperty('label')) {
          // 默认更新edge的第一个label
          await updateEdgeLabelService(x6Edge, edgeConfig, options);
        }

        if (isBoolean(edgeConfig?.visible)) {
          x6Edge.setVisible(edgeConfig?.visible);
        }

        if (edgeConfig.attrs) {
          x6Edge.setAttrs(edgeConfig.attrs);
        }
        if (edgeConfig.vertices) {
          x6Edge.setVertices(edgeConfig.vertices);
        }
        if (edgeConfig.router) {
          x6Edge.setRouter(edgeConfig.router);
        }
        if (edgeConfig.connector) {
          x6Edge.setConnector(edgeConfig.connector);
        }
        if (isObject(edgeConfig.source)) {
          //@ts-ignore
          x6Edge.setSource(edgeConfig.source as any);
        }
        if (isObject(edgeConfig.target)) {
          //@ts-ignore
          x6Edge.setTarget(edgeConfig.target as any);
        }

        return {
          edgeConfig,
          edgeCell: x6Edge
        };
      },
      runtimeHook
    );
  };
}

export namespace NsUpdateEdge {
  export const command = XFlowEdgeCommands.UPDATE_EDGE;
  export const hookKey = 'updateEdge';
  export const XFlowEdgeSetOptions: Edge.SetOptions = { overwrite: true };
  export interface IArgs extends IArgsBase {
    /** edgeConfig */
    edgeConfig: NsGraph.IEdgeConfig;
    /** options */
    options: Edge.SetOptions;
    /** 更新的Service */
    updateEdgeService?: IUpdateEdgeService;
    /** 更新Label的Service */
    updateEdgeLabelService?: IUpdateEdgeLabelService;
  }

  export const XFlowUpdateLabelService = async (
    edge: Edge,
    edgeConfig: NsGraph.IEdgeConfig,
    options = NsUpdateEdge.XFlowEdgeSetOptions
  ) => {
    edge?.setLabelAt(0, edgeConfig?.label || edgeConfig, options);
  };

  export interface IResult {
    edgeConfig: NsGraph.IEdgeConfig;
    edgeCell: Edge;
  }

  export interface IUpdateEdgeService {
    (args: IArgs): Promise<NsGraph.IEdgeConfig>;
  }
  export interface IUpdateEdgeLabelService {
    (edge: Edge, edgeConfig: NsGraph.IEdgeConfig, options: Edge.SetOptions): Promise<NsGraph.IEdgeConfig>;
  }

  export interface ICmdHooks extends IHooks {
    updateEdge: HookHub<IArgs, IResult>;
  }
}
