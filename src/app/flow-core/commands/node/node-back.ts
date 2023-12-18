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
export class BackNodeCommand {
  token: string = XFlowNodeCommands.BACK_NODE.id;

  ctx: CmdContext<NsBackNode.IArgs, NsBackNode.IResult, NsBackNode.ICmdHooks>;

  execute = async () => {
    const { args, hooks: runtimeHook } = this.ctx.getArgs();

    const hooks = this.ctx.getHooks();

    const result = await hooks.backNode.call(
      args,
      async handlerArgs => {
        const graph = await this.ctx.getX6Graph();
        const { nodeId } = handlerArgs;
        const node = graph.getCellById(nodeId);
        if (node) {
          node.toBack();
          this.ctx.addUndo(
            Disposable.create(async () => {
              handlerArgs.commandService.executeCommand(XFlowNodeCommands.FRONT_NODE.id, {
                nodeId
              });
            })
          );
        } else {
          console.error(nodeId, 'nodeId is not exist');
        }
        return {};
      },
      runtimeHook
    );
    this.ctx.setResult(result);
    return this;
  };
}

export namespace NsBackNode {
  export const command = XFlowNodeCommands.BACK_NODE;

  export interface IArgs extends IArgsBase {
    nodeId: string;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface IResult {}

  export const hookKey = 'backNode';
  export interface ICmdHooks extends IHooks {
    backNode: HookHub<IArgs, IResult>;
  }
}
