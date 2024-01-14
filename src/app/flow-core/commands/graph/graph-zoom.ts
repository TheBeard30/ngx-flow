import { XFlowGraphCommands } from '@/app/flow-core/constants';
import { NsGraph } from '@/app/flow-core/interfaces';
import { IArgsBase } from '@/app/flow-core/commands/interface';
import { IHooks } from '@/app/flow-core/hooks/interface';
import { HookHub } from '@/app/flow-core/hooks/hookhub';
import { CmdContext } from '@/app/flow-core/commands';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GraphZoomCommand {
  token: string = XFlowGraphCommands.GRAPH_ZOOM.id;

  ctx: CmdContext<NsGraphZoom.IArgs, NsGraphZoom.IResult, NsGraphZoom.ICmdHooks>;

  execute = async () => {
    const { args, hooks: runtimeHook } = this.ctx.getArgs();
    const hooks = this.ctx.getHooks();
    const result = await hooks.graphZoom.call(
      args,
      async handlerArgs => {
        const graph = await this.ctx.getX6Graph();
        const { factor, zoomFitPadding = 12, zoomOptions = NsGraphZoom.defaultZoomOptions } = handlerArgs;
        if (typeof factor === 'number') {
          graph.zoom(factor, zoomOptions || {});
        } else if (factor === 'fit') {
          graph.zoomToFit({ ...zoomOptions, padding: zoomFitPadding });
        } else if (factor === 'real') {
          graph.scale(1);
          graph.centerContent();
        }

        return { factor, zoomFitPadding, zoomOptions };
      },
      runtimeHook
    );
    this.ctx.setResult(result);
    return this;
  };
}

export namespace NsGraphZoom {
  export const command = XFlowGraphCommands.GRAPH_ZOOM;
  /** zoom options */
  export const MAX_SCALE = 1.5;
  export const MIN_SCALE = 0.05;

  export const defaultZoomOptions: NsGraphZoom.IArgs['zoomOptions'] = {
    maxScale: NsGraphZoom.MAX_SCALE,
    minScale: NsGraphZoom.MIN_SCALE
  };

  /** hookName */
  export const hookKey = 'graphZoom';
  /** hook 参数类型 */
  export interface IArgs extends IArgsBase {
    /** 缩放因子 */
    factor: number | 'fit' | 'real';
    /** 缩放配置项 */
    zoomOptions?: NsGraph.ZoomOptions;
    /** 自适应Padding参数(边距) */
    zoomFitPadding?: number;
  }
  /** hook handler 返回类型 */
  export interface IResult {
    factor: number | 'fit' | 'real';
    zoomOptions: NsGraph.ZoomOptions;
    zoomFitPadding: number;
  }
  /** hooks 类型 */
  export interface ICmdHooks extends IHooks {
    graphZoom: HookHub<IArgs, IResult>;
  }
}
