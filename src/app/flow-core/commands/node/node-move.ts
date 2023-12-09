import { Injectable } from '@angular/core';
import { XFlowNodeCommands } from '@/app/flow-core/constants';
import { CmdContext } from '@/app/flow-core/commands';
import { HookHub } from '@/app/flow-core/hooks/hookhub';
import { IHooks } from '@/app/flow-core/hooks/interface';
import { IArgsBase } from '@/app/flow-core/commands/interface';
import { Node } from '@antv/x6';
@Injectable({
  providedIn: 'root'
})
export class MoveNodeCommand {
  token: string = XFlowNodeCommands.MOVE_NODE.id;

  ctx: CmdContext<NsMoveNode.IArgs, NsMoveNode.IResult, NsMoveNode.ICmdHooks>;

  execute = async () => {
    const { args, hooks: runtimeHook } = this.ctx.getArgs();
    const hooks = this.ctx.getHooks();

    hooks.moveNode.call(
      args,
      async handlerArgs => {
        const { dx = 0, dy = 0, x, y, duration = 150 } = handlerArgs.position;
        const x6Graph = await this.ctx.getX6Graph();
        const node = x6Graph.getCellById(handlerArgs.id) as Node;
        if (node) {
          let nextX = x;
          let nextY = y;
          const { x: preX, y: preY } = node.position();
          let undo = () => {
            node.position(preX, preY, { silent: false });
          };
          if (dx || dy) {
            nextX = dx + preX;
            nextY = dy + preY;
            node.translate(dx, dy, { transition: { duration } });
            undo = () => node.translate(-dx, -dy, { transition: { duration } });
          } else {
            node.position(nextX, nextY, { silent: false });
          }

          return { err: null, nextX, nextY };
        }
        return null;
      },
      runtimeHook
    );
    return this;
  };
}

export namespace NsMoveNode {
  /** Command: 用于注册named factory */
  export const command = XFlowNodeCommands.MOVE_NODE;
  /** hookName */
  export const hookKey = 'moveNode';

  /** hook 参数类型 */
  export interface IArgs extends IArgsBase {
    id: string;
    position: {
      x?: number;
      y?: number;
      dx?: number;
      dy?: number;
      duration?: number;
    };
    nodePositionService?: INodePositionService;
  }
  /** hook handler 返回类型 */
  export interface IResult {
    err: null | string;
    nextY?: number;
    nextX?: number;
  }
  /** api service 类型 */
  export interface INodePositionService {
    (args: IArgs): Promise<boolean>;
  }
  /** hooks 类型 */
  export interface ICmdHooks extends IHooks {
    moveNode: HookHub<IArgs, IResult>;
  }
}
