import { IGraphCommand } from '@/app/flow-core/interfaces';
import { HookHub } from '@/app/flow-core/hooks/hookhub';
import { NsAddEdge } from './edge-add';

export * from './edge-add';

export const edgeHookHubList: {
  command: IGraphCommand;
  hookKey: string;
  createHook?: () => HookHub;
}[] = [NsAddEdge];
