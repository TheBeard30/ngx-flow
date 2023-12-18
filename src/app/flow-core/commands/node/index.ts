import { NsAddNode } from './node-add';
import { NsUpdateNode } from './node-update';
import { NsDelNode } from './node-delete';
import { NsSelectNode } from './node-select';
import { NsMoveNode } from './node-move';
import { HookHub } from '@/app/flow-core/hooks/hookhub';
import { IGraphCommand } from '@/app/flow-core/interfaces';
import { NsBackNode } from './node-back';
import { NsFrontNode } from './node-front';

export * from './node-add';
export * from './node-update';

export const nodeHookHubList: {
  command: IGraphCommand;
  hookKey: string;
  createHook?: () => HookHub;
}[] = [NsAddNode, NsUpdateNode, NsDelNode, NsSelectNode, NsMoveNode, NsBackNode, NsFrontNode];
