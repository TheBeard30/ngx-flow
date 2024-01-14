import { Injectable } from '@angular/core';
import { XFlowGraphCommands } from '@/app/flow-core/constants';
import { CmdContext } from '@/app/flow-core/commands';
import { IArgsBase } from '@/app/flow-core/commands/interface';
import { IHooks } from '@/app/flow-core/hooks/interface';
import { HookHub } from '@/app/flow-core/hooks/hookhub';

@Injectable({
  providedIn: 'root'
})
export class GraphFullscreenCommand {
  token: string = XFlowGraphCommands.GRAPH_FULLSCREEN.id;

  ctx: CmdContext<NsGraphFullscreen.IArgs, NsGraphFullscreen.IResult, NsGraphFullscreen.ICmdHooks>;

  execute = async () => {
    const { args, hooks: runtimeHook } = this.ctx.getArgs();
    const hooks = this.ctx.getHooks();
    const config = await this.ctx.getGraphConfig();
    const { appContainer } = config;
    if (!appContainer) {
      return null;
    }
    const result = await hooks.graphFullscreen.call(
      /** 执行hooks pipeline处理args */
      args,
      /** 执行 callback */
      async () => {
        let fullscreen = false;
        if (!document.fullscreenElement) {
          appContainer.requestFullscreen?.();
          fullscreen = true;
        } else {
          document.exitFullscreen?.();
        }
        return { fullscreen };
      },
      /** execute command 时创建的hook */
      runtimeHook
    );

    /** 设置结果 */
    this.ctx.setResult(result);
    return this;
  };
}

export namespace NsGraphFullscreen {
  export const command = XFlowGraphCommands.GRAPH_FULLSCREEN;
  /** hook 参数类型 */
  export interface IArgs extends IArgsBase {}
  /** hook handler 返回类型 */
  export interface IResult {
    fullscreen: boolean;
  }
  /** hookName */
  export const hookKey = 'graphFullscreen';
  /** hooks 类型 */
  export interface ICmdHooks extends IHooks {
    graphFullscreen: HookHub<IArgs, IResult>;
  }
}
