import { Injectable } from '@angular/core';
import { XFlowGraphCommands } from '@/app/flow-core/constants';
import { CmdContext } from '@/app/flow-core/commands';
import { IArgsBase } from '@/app/flow-core/commands/interface';
import { IHooks } from '@/app/flow-core/hooks/interface';
import { HookHub } from '@/app/flow-core/hooks/hookhub';

@Injectable({
  providedIn: 'root'
})
export class GraphResizeCommand {
  token: string = XFlowGraphCommands.GRAPH_RESIZE.id;

  ctx: CmdContext<NsGraphResize.IArgs, NsGraphResize.IResult, NsGraphResize.ICmdHooks>;

  execute = async () => {
    const { args, hooks: runtimeHook } = this.ctx.getArgs();
    const hooks = this.ctx.getHooks();
    const config = await this.ctx.getGraphConfig();
    const clientHeight = config.rootContainer.clientHeight;
    const clientWidth = config.rootContainer.clientWidth;
    const result = await hooks.graphResize.call(
      /** 执行hooks pipeline处理args */
      args,
      /** 执行 callback */
      async handlerArgs => {
        const graph = await this.ctx.getX6Graph();
        const { width = clientWidth, height = clientHeight } = handlerArgs;
        console.log(width, height);
        graph?.resize(width, height);
        return {};
      },
      /** execute command 时创建的hook */
      runtimeHook
    );

    /** 设置结果 */
    this.ctx.setResult(result);
    return this;
  };

  undo = async () => {
    this.ctx.undo();
    return this;
  };

  /** redo cmd */
  redo = async () => {
    if (!this.ctx.isUndoable) {
      await this.execute();
    }
    return this;
  };

  /** isUndoable */
  isUndoable(): boolean {
    return this.ctx.isUndoable();
  }
}

export namespace NsGraphResize {
  /** Command: 用于注册named factory */
  export const command = XFlowGraphCommands.GRAPH_RESIZE;
  /** hook 参数类型 */
  export interface IArgs extends IArgsBase {
    /** 宽度 */
    width?: number;
    /** 高度 */
    height?: number;
  }
  /** hook handler 返回类型 */
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface IResult {}
  /** hookName */
  export const hookKey = 'graphResize';
  /** hooks 类型 */
  export interface ICmdHooks extends IHooks {
    graphResize: HookHub<IArgs, IResult>;
  }
}
