import { XFlowGraphCommands } from '@/app/flow-core/constants';
import { Injectable } from '@angular/core';
import { CmdContext } from '@/app/flow-core/commands';
import { HookHub } from '@/app/flow-core/hooks/hookhub';
import { IHooks } from '@/app/flow-core/hooks/interface';
import { IArgsBase } from '@/app/flow-core/commands/interface';
import { Disposable } from '@/app/flow-core/common/disposable';

@Injectable({
  providedIn: 'root'
})
export class GraphHistoryRedoCommand {
  token: string = XFlowGraphCommands.GRAPH_HISTORY_REDO.id;

  ctx: CmdContext<NsGraphHistoryRedo.IArgs, NsGraphHistoryRedo.IResult, NsGraphHistoryRedo.ICmdHooks>;

  execute = async () => {
    const { args, hooks: runtimeHook } = this.ctx.getArgs();
    const hooks = this.ctx.getHooks();

    const result = await hooks.historyRedo.call(
      args,
      async handlerArgs => {
        const graph = await this.ctx.getX6Graph();
        if (graph.isHistoryEnabled() === false) {
          return { err: 'history is disabled' };
        }
        graph.redo();
        this.ctx.addUndo(
          Disposable.create(async () => {
            const { commandService } = handlerArgs;
            commandService.executeCommand(XFlowGraphCommands.GRAPH_HISTORY_UNDO.id, {});
          })
        );
        return { err: null };
      },
      runtimeHook
    );
    this.ctx.setResult(result);
    return this;
  };

  /** undo cmd */
  undo = async () => {
    if (this.isUndoable()) {
      this.ctx.undo();
    }
    return this;
  };

  /** redo cmd */
  redo = async () => {
    if (!this.isUndoable()) {
      await this.execute();
    }
    return this;
  };

  isUndoable(): boolean {
    return this.ctx.isUndoable();
  }
}

export namespace NsGraphHistoryRedo {
  /** Command: 用于注册named factory */
  export const command = XFlowGraphCommands.GRAPH_HISTORY_REDO;
  /** hookName */
  export const hookKey = 'historyRedo';
  /** hook 参数类型 */
  export type IArgs = IArgsBase;
  /** hook handler 返回类型 */
  export interface IResult {
    err: null | string;
  }
  /** hooks 类型 */
  export interface ICmdHooks extends IHooks {
    historyRedo: HookHub<IArgs, IResult>;
  }
}
