import { NsGraphRender } from './graph-render';
import { NsGraphResize } from './graph-resize';
import { NsGraphZoom } from './graph-zoom';
import { IHooks } from '@/app/flow-core/hooks/interface';
import { HookHub } from '@/app/flow-core/hooks/hookhub';
import { IGraphCommand } from '@/app/flow-core/interfaces';
import { NsGraphFullscreen } from './graph-fullscreen';

export * from './graph-render';
export * from './graph-load-data';
export * from './graph-resize';
export * from './graph-zoom';
export * from './graph-fullscreen';

export const graphHookHubList: {
  command: IGraphCommand;
  hookKey: string;
  createHook?: () => HookHub;
}[] = [NsGraphRender, NsGraphResize, NsGraphZoom, NsGraphFullscreen];

export interface ICmdHooks extends IHooks, NsGraphRender.ICmdHooks {}
