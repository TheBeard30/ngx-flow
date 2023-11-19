import { NsAddNode } from './node-add';
import { HookHub } from '@/app/flow-core/hooks/hookhub';
import { IGraphCommand } from '@/app/flow-core/interfaces';

export * from './node-add';

export const nodeHookHubList: {
  command: IGraphCommand;
  hookKey: string;
  createHook?: () => HookHub;
}[] = [NsAddNode];
