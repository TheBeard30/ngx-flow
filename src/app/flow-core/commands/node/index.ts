import { NsAddNode } from './node-add';
import { NsUpdateNode } from './node-update';
import { NsDelNode } from './node-delete';
import { NsSelectNode } from './node-select';
import { NsMoveNode } from './node-move';
import { HookHub } from '@/app/flow-core/hooks/hookhub';
import { IGraphCommand } from '@/app/flow-core/interfaces';
import { NsBackNode } from './node-back';
import { NsFrontNode } from './node-front';
import { Simplify } from '../../common/types';

export * from './node-add';
export * from './node-update';

export const nodeHookHubList: {
  command: IGraphCommand;
  hookKey: string;
  createHook?: () => HookHub;
}[] = [NsAddNode, NsUpdateNode, NsDelNode, NsSelectNode, NsMoveNode, NsBackNode, NsFrontNode];

/** Command 参数类型*/
export namespace NsNodeCmd {
  export namespace AddNode {
    export type IArgs = Simplify<NsAddNode.IArgs>
    export type IResult = Simplify<NsAddNode.IResult>
  }
  export namespace DelNode {
    export type IArgs = Simplify<NsDelNode.IArgs>
    export type IResult = Simplify<NsDelNode.IResult>
  }
  export namespace SelectNode {
    export type IArgs = Simplify<NsSelectNode.IArgs>
    export type IResult = Simplify<NsSelectNode.IResult>
  }
  export namespace MoveNode {
    export type IArgs = Simplify<NsMoveNode.IArgs>
    export type IResult = Simplify<NsMoveNode.IResult>
  }

  // // eslint-disable-next-line @typescript-eslint/no-shadow
  // export namespace UpdateNodePort {
  //   export type IArgs = Simplify<NsUpdateNodePort.IArgs>
  //   export type IResult = Simplify<NsUpdateNodePort.IResult>
  // }
  // export namespace UpdateNode {
  //   export type IArgs = Simplify<NsUpdateNode.IArgs>
  //   export type IResult = Simplify<NsUpdateNode.IResult>
  // }

  // export namespace CenterNode {
  //   export type IArgs = Simplify<NsCenterNode.IArgs>
  //   export type IResult = Simplify<NsCenterNode.IResult>
  // }
  export namespace FrontNode {
    export type IArgs = Simplify<NsFrontNode.IArgs>
    export type IResult = Simplify<NsFrontNode.IResult>
  }

  export namespace BackNode {
    export type IArgs = Simplify<NsBackNode.IArgs>
    export type IResult = Simplify<NsBackNode.IResult>
  }

  // export namespace HighlightNode {
  //   export type IArgs = Simplify<NsHighlightNode.IArgs>
  //   export type IResult = Simplify<NsHighlightNode.IResult>
  // }
}