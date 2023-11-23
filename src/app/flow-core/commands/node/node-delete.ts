import { Injectable } from '@angular/core';
import { CmdContext, XFlowEdgeCommands, XFlowNodeCommands } from '@/app/flow-core/commands';
import { IArgsBase } from '@/app/flow-core/commands/interface';
import { NsGraph } from '@/app/flow-core/interfaces';
import { Model } from '@antv/x6';
import { IHooks } from '@/app/flow-core/hooks/interface';
import { HookHub } from '@/app/flow-core/hooks/hookhub';

@Injectable({
  providedIn: 'root'
})
export class DeleteNodeCommand {
  token: string = XFlowNodeCommands.DEL_NODE.id;

  ctx: CmdContext<NsDelNode.IArgs, NsDelNode.IResult, NsDelNode.ICmdHooks>;

  execute = async () => {
    const { args, hooks: runtimeHook } = this.ctx.getArgs();

    const hooks = this.ctx.getHooks();

    await hooks.delNode.call(
      args,
      async handlerArgs => {
        const { commandService, deleteNodeService, options } = handlerArgs;
        const graph = await this.ctx.getX6Graph();

        if (deleteNodeService) {
          const canDel = await deleteNodeService(handlerArgs);
          if (!canDel) return { err: ' service rejected' };
        }
        //@ts-ignore
        const nodeId = (handlerArgs.x6Node || handlerArgs.nodeConfig).id;
        const nodeCell = graph.getCellById(nodeId);

        if (nodeCell && nodeCell.isNode()) {
          /** 先清理连线 */
          const edges = [...(graph.getIncomingEdges(nodeCell) || []), ...(graph.getOutgoingEdges(nodeCell) || [])];

          await Promise.all(
            edges.map(edge => {
              return commandService.executeCommand(XFlowEdgeCommands.DEL_EDGE.id, {
                x6Edge: edge
              });
            })
          );
          /** 再清理节点 */
          const nodeConfig = nodeCell.getData<NsGraph.INodeConfig>();
          nodeCell.remove({ ...options, isCommand: true });

          return { err: null, nodeConfig };
        }
        return { err: 'node is not exist' };
      },
      runtimeHook
    );
  };
}

export namespace NsDelNode {
  /** Command: 用于注册named factory */
  export const command = XFlowNodeCommands.DEL_NODE;
  /** hook name */
  export const hookKey = 'delNode';

  /** hook 参数类型 */
  export interface IArgs extends IArgsBase {
    /** X6 Node Cell */
    x6Node?: Node;
    /** Node元数据 */
    nodeConfig: NsGraph.INodeConfig;
    /** X6 Model Options：https://x6.antv.vision/zh/docs/api/graph/model/#addnode */
    options?: Model.RemoveOptions;
    /** 删除Node的服务 */
    deleteNodeService?: IDeleteNodeService;
  }
  /** hook handler 返回类型 */
  export interface IResult {
    err: null | string;
    nodeConfig?: NsGraph.INodeConfig;
  }
  /** del node api service 类型, 返回true时删除 */
  export interface IDeleteNodeService {
    (args: IArgs): Promise<boolean>;
  }
  /** hooks 类型 */
  export interface ICmdHooks extends IHooks {
    delNode: HookHub<IArgs, IResult>;
  }
}
