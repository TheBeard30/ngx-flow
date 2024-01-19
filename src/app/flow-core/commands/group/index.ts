import { Simplify } from "../../common/types"
import { HookHub } from "../../hooks/hookhub"
import { IGraphCommand } from "../../interfaces"
import { NsAddGroup } from "./group-add"
import { NsDelGroup } from "./group-del"
import { NsCollapseGroup } from './group-toggle-collapse'

/** app onStart 时, 注册 Command Hooks */
export const groupHookhubList: {
  command: IGraphCommand
  hookKey: string
  createHook?: () => HookHub
}[] = [NsAddGroup, NsCollapseGroup, NsDelGroup]


/** Command 参数类型*/
export namespace NsGroupCmd {
  export namespace AddGroup {
    export type IArgs = Simplify<NsAddGroup.IArgs>
    export type IResult = Simplify<NsAddGroup.IResult>
  }
  export namespace DelGroup {
    export type IArgs = Simplify<NsDelGroup.IArgs>
    export type IResult = Simplify<NsDelGroup.IResult>
  }
  // export namespace InitGroup {
  //   export type IArgs = Simplify<NsInitGroup.IArgs>
  //   export type IResult = Simplify<NsInitGroup.IResult>
  // }
  export namespace CollapseGroup {
    export type IArgs = Simplify<NsCollapseGroup.IArgs>
    export type IResult = Simplify<NsCollapseGroup.IResult>
  }
}
