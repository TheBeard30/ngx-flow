import { XFlowEdgeCommands } from '@/app/flow-core/constants';
import { CmdContext } from '@/app/flow-core/commands';
import { Injectable } from '@angular/core';
import { IArgsBase } from '@/app/flow-core/commands/interface';
import { Cell, Edge, Model } from '@antv/x6';
import { NsGraph } from '@/app/flow-core/interfaces';
import { IHooks } from '@/app/flow-core/hooks/interface';
import { HookHub } from '@/app/flow-core/hooks/hookhub';

@Injectable({
  providedIn: 'root'
})
export class DeleteEdgeCommand {
  token: string = XFlowEdgeCommands.DEL_EDGE.id;

  ctx: CmdContext<NsDelEdge.IArgs, NsDelEdge.IResult, NsDelEdge.ICmdHooks>;

  execute = async () => {
    const { args, hooks: runtimeHook } = this.ctx.getArgs();
    const hooks = this.ctx.getHooks();
    await hooks.delEdge.call(
      args,
      async handlerArgs => {
        const { edgeConfig, x6Edge, deleteEdgeService, commandService, options } = handlerArgs;
        let edgeCell = x6Edge;
        /** 没有edgeCell时查找cell */
        if (!edgeCell) {
          edgeCell = await this.findEdgeById(edgeConfig);
          if (!edgeCell) {
            console.error(NsDelEdge.ErrEnum.EDGE_NOT_EXIST, edgeConfig);
            return { err: NsDelEdge.ErrEnum.EDGE_NOT_EXIST };
          }
        }

        const isEdge = edgeCell && edgeCell.isEdge();
        if (!isEdge) {
          console.error(NsDelEdge.ErrEnum.EDGE_NOT_EXIST, edgeCell);
          return { err: NsDelEdge.ErrEnum.EDGE_NOT_EXIST };
        }

        if (deleteEdgeService) {
          /** 需要请求接口 */
          const canDelete = await deleteEdgeService(handlerArgs);
          if (!canDelete) {
            return { err: NsDelEdge.ErrEnum.SERVICE_REJECT };
          }
        }
        try {
          const targetCell = edgeCell.getTargetCell();
          const sourceCell = edgeCell.getSourceCell();
          const sourcePortId = edgeCell.getSourcePortId();
          const targetPortId = edgeCell.getTargetPortId();
          const source = sourceCell ? sourceCell.id : (sourceCell as Edge).source;
          const target = targetCell ? targetCell.id : (targetCell as Edge).target;
          /** 执行remove */
          edgeCell.remove({ ...options, isCommand: true });

          /** 创建 undo */
          const undo = () => {
            commandService.executeCommand(XFlowEdgeCommands.ADD_EDGE.id, {
              edgeConfig: { source, target, sourcePortId, targetPortId }
            });
          };

          return {
            err: null,
            edgeConfig: { source, target, sourcePortId, targetPortId },
            targetCell,
            sourceCell,
            sourcePortId,
            targetPortId
          };
        } catch (error) {
          console.error(NsDelEdge.ErrEnum.X6_DELETE_FAILED, error);
          return { err: NsDelEdge.ErrEnum.X6_DELETE_FAILED };
        }
      },
      runtimeHook
    );
  };

  private findEdgeById = async (edge: NsGraph.IEdgeConfig) => {
    const graph = await this.ctx.getX6Graph();
    return graph.getCellById(edge.id) as Edge;
  };
}

export namespace NsDelEdge {
  /** Command: 用于注册named factory */
  export const command = XFlowEdgeCommands.DEL_EDGE;
  /** hookName */
  export const hookKey = 'delEdge';

  export interface IDeleteEdgeService {
    (args: IArgs): Promise<boolean>;
  }
  /** hook 参数类型 */
  export interface IArgs extends IArgsBase {
    /** EdgeCell */
    x6Edge?: Edge<Edge.Properties>;
    /** Edge元数据 */
    edgeConfig?: NsGraph.IEdgeConfig;
    /** X6 Model Options：https://x6.antv.vision/zh/docs/api/graph/model/#addnode */
    options?: Model.RemoveOptions;
    /** Edge 删除服务 */
    deleteEdgeService?: IDeleteEdgeService;
  }
  /** hook handler 返回类型 */
  export interface IResult {
    err: any;
    edgeConfig?: {
      source: string | Edge.TerminalData;
      target: string | Edge.TerminalData;
      sourcePortId: string;
      targetPortId: string;
    };
    targetCell?: Cell;
    sourceCell?: Cell;
    sourcePortId?: string;
    targetPortId?: string;
  }
  /** api service 类型 */

  /** hooks 类型 */
  export interface ICmdHooks extends IHooks {
    delEdge: HookHub<IArgs, IResult>;
  }
  export enum ErrEnum {
    EDGE_NOT_EXIST = 'edge is not exist',
    EDGE_INVALID_CELL = 'this is not a valid cell',
    X6_DELETE_FAILED = 'x6 throw err when call delete edge',
    SERVICE_REJECT = 'service reject to delete'
  }
}
