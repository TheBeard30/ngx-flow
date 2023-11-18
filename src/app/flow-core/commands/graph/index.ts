import { NsGraphRender } from './graph-render';
import { IHooks } from '@/app/flow-core/hooks/interface';
import { HookHub } from '@/app/flow-core/hooks/hookhub';
import { IGraphCommand } from '@/app/flow-core/interfaces';

export * from './graph-render';
export * from './graph-load-data';

export const hookHubList: {
  command: IGraphCommand;
  hookKey: string;
  createHook?: () => HookHub;
}[] = [NsGraphRender];

export interface ICmdHooks extends IHooks, NsGraphRender.ICmdHooks {}
