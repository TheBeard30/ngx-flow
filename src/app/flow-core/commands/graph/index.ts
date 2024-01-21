import { NsGraphRender } from './graph-render';
import { NsGraphResize } from './graph-resize';
import { NsGraphZoom } from './graph-zoom';
import { IHooks } from '@/app/flow-core/hooks/interface';
import { HookHub } from '@/app/flow-core/hooks/hookhub';
import { IGraphCommand } from '@/app/flow-core/interfaces';
import { NsGraphFullscreen } from './graph-fullscreen';
import { Simplify } from '../../common/types';
import { NsGraphToggleMultiSelect } from './graph-toggle-multi-select';
import { NsGraphSaveData } from './graph-save-data';
import { NsGraphHistoryRedo } from './graph-history-redo';
import { NsGraphHistoryUndo } from './graph-history-undo';

export * from './graph-render';
export * from './graph-load-data';
export * from './graph-resize';
export * from './graph-zoom';
export * from './graph-fullscreen';
export * from './graph-history-redo';
export * from './graph-history-undo';

export const graphHookHubList: {
  command: IGraphCommand;
  hookKey: string;
  createHook?: () => HookHub;
}[] = [
  NsGraphRender,
  NsGraphResize,
  NsGraphToggleMultiSelect,
  NsGraphSaveData,
  NsGraphZoom,
  NsGraphFullscreen,
  NsGraphHistoryRedo,
  NsGraphHistoryUndo
];

export interface ICmdHooks extends IHooks, NsGraphRender.ICmdHooks {}
/** Command 参数类型*/
export namespace NsGraphCmd {
  // 渲染
  export namespace GraphRender {
    export type IArgs = Simplify<NsGraphRender.IArgs>;
    export type IResult = Simplify<NsGraphRender.IResult>;
  }

  export namespace GraphResize {
    export type IArgs = Simplify<NsGraphResize.IArgs>;
    export type IResult = Simplify<NsGraphResize.IResult>;
  }

  export namespace GraphToggleMultiSelect {
    export type IArgs = Simplify<NsGraphToggleMultiSelect.IArgs>;
    export type IResult = Simplify<NsGraphToggleMultiSelect.IResult>;
  }
  export namespace SaveGraphData {
    export type IArgs = Simplify<NsGraphSaveData.IArgs>;
    export type IResult = Simplify<NsGraphSaveData.IResult>;
  }
}
