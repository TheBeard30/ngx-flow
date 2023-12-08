import { Injectable } from '@angular/core';
import { XFlowNodeCommands } from '@/app/flow-core/constants';
import { IArgsBase } from '@/app/flow-core/commands/interface';
import { IHooks } from '@/app/flow-core/hooks/interface';
import { HookHub } from '@/app/flow-core/hooks/hookhub';
import { CmdContext } from '@/app/flow-core/commands';

@Injectable({
  providedIn: 'root'
})
export class SelectNode {
  token: string = XFlowNodeCommands.SELECT_NODE.id;

  ctx: CmdContext<NsSelectNode.IArgs, NsSelectNode.IResult, NsSelectNode.ICmdHooks>;

  execute = async () => {
    const { args, hooks: runtimeHook } = this.ctx.getArgs();
    const hooks = this.ctx.getHooks();

    await hooks.selectNode.call(
      args,
      async handlerArgs => {
        const graph = await this.ctx.getX6Graph();
        // @ts-ignore
        const currentSelectionIds = graph.getSelectedCells().map(node => node.id);
        const { nodeIds, resetSelection, commandService } = handlerArgs;

        if (resetSelection) {
          // @ts-ignore
          graph.resetSelection(nodeIds);
        } else {
          // @ts-ignore
          graph.select(nodeIds);
        }
        return {};
      },
      runtimeHook
    );
    return this;
  };
}

export namespace NsSelectNode {
  export const command = XFlowNodeCommands.SELECT_NODE;
  export const hookKey = 'selectNode';

  export interface IArgs extends IArgsBase {
    /** 选中的节点id */
    nodeIds: string[];
    /** 取消所有节点的选中状态 */
    resetSelection?: boolean;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface IResult {}

  export interface ICmdHooks extends IHooks {
    selectNode: HookHub<IArgs, IResult>;
  }
}
