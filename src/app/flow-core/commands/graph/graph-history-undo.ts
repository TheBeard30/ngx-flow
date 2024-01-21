import { Injectable } from '@angular/core';
import { XFlowGraphCommands } from '@/app/flow-core/constants';
import { CmdContext } from '@/app/flow-core/commands';
import { IArgsBase } from '@/app/flow-core/commands/interface';
import { IHooks } from '@/app/flow-core/hooks/interface';
import { HookHub } from '@/app/flow-core/hooks/hookhub';
import { Disposable } from '@/app/flow-core/common/disposable';

@Injectable({
  providedIn: 'root'
})
export class GraphHistoryUndoCommand {
  token: string = XFlowGraphCommands.GRAPH_HISTORY_UNDO.id;
  ctx: CmdContext<NsGraphHistoryUndo.IArgs, NsGraphHistoryUndo.IResult, NsGraphHistoryUndo.ICmdHooks>;

  execute = async () => {
    const { args, hooks: runtimeHook } = this.ctx.getArgs();
    const hooks = this.ctx.getHooks();

    const result = await hooks.historyUndo.call(
      args,
      async handlerArgs => {
        const graph = await this.ctx.getX6Graph();
        if (graph.isHistoryEnabled() === false) {
          return {
            err: 'history is disabled'
          };
        }
        graph.undo();
        this.ctx.addUndo(
          Disposable.create(async () => {
            const { commandService } = handlerArgs;
            commandService.executeCommand(XFlowGraphCommands.GRAPH_HISTORY_REDO.id, {});
          })
        );
        return { err: null };
      },
      runtimeHook
    );
    this.ctx.setResult(result);
    return this;
  };
}

export namespace NsGraphHistoryUndo {
  /** Command: 用于注册named factory */
  export const command = XFlowGraphCommands.GRAPH_HISTORY_UNDO;
  /** hookName */
  export const hookKey = 'historyUndo';
  /** hook 参数类型 */
  export interface IArgs extends IArgsBase {
    enabled?: boolean;
  }
  /** hook handler 返回类型 */
  export interface IResult {
    err: null | string;
  }
  /** hooks 类型 */
  export interface ICmdHooks extends IHooks {
    historyUndo: HookHub<IArgs, IResult>;
  }
}
