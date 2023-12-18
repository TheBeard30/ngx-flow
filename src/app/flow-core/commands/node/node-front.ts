import { Injectable } from '@angular/core';
import { XFlowNodeCommands } from '@/app/flow-core/constants';
import { CmdContext } from '@/app/flow-core/commands';
import { IArgsBase } from '@/app/flow-core/commands/interface';
import { IHooks } from '@/app/flow-core/hooks/interface';
import { HookHub } from '@/app/flow-core/hooks/hookhub';
import { Disposable } from '@/app/flow-core/common/disposable';

@Injectable({
  providedIn: 'root'
})
export class FrontNodeCommand {
  token: string = XFlowNodeCommands.FRONT_NODE.id;

  ctx: CmdContext<NsFrontNode.IArgs, NsFrontNode.IResult, NsFrontNode.ICmdHooks>;

  execute = async () => {
    const { args, hooks: runtimeHook } = this.ctx.getArgs();
    const hooks = this.ctx.getHooks();

    const result = await hooks.frontNode.call(
      args,
      async handlerArgs => {
        const graph = await this.ctx.getX6Graph();
        const { nodeId } = handlerArgs;
        const node = graph?.getCellById(nodeId);
        if (node) {
          node.toFront();
          /** frontNode undo */
          this.ctx.addUndo(
            Disposable.create(async () => {
              handlerArgs.commandService.executeCommand(XFlowNodeCommands.BACK_NODE.id, {
                nodeId
              });
            })
          );
        } else {
          console.error(nodeId, 'this nodeId is not exist');
        }
        return {};
      },
      runtimeHook
    );
    this.ctx.setResult(result);
    return this;
  };
}

export namespace NsFrontNode {
  export const command = XFlowNodeCommands.FRONT_NODE;
  export const hookKey = 'frontNode';

  export interface IArgs extends IArgsBase {
    nodeId: string;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface IResult {}

  export interface ICmdHooks extends IHooks {
    frontNode: HookHub<IArgs, IResult>;
  }
}
