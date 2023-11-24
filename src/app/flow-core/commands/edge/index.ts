import { IGraphCommand } from '@/app/flow-core/interfaces';
import { HookHub } from '@/app/flow-core/hooks/hookhub';
import { NsAddEdge } from './edge-add';
import { NsUpdateEdge } from './edge-update';
import { NsDelEdge } from './edge-delete';

export * from './edge-add';
export * from './edge-update';
export * from './edge-delete';

export const edgeHookHubList: {
  command: IGraphCommand;
  hookKey: string;
  createHook?: () => HookHub;
}[] = [NsAddEdge, NsUpdateEdge, NsDelEdge];
