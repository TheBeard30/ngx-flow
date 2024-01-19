import { Injectable } from "@angular/core";
import { CmdContext } from "../cmd-context";
import { XFlowGroupCommands } from "../constant";
import { HookHub } from "../../hooks/hookhub";
import { IHooks } from "../../hooks/interface";
import { NsGraph } from "../../interfaces";
import { IArgsBase } from "../interface";
import { XFlowNodeCommands } from "../../constants/global";
import { Disposable } from "../../common/disposable";

@Injectable({
    providedIn: 'root'
})
export class DelGroupCommand {
    token: string = XFlowGroupCommands.DEL_GROUP.id;

    ctx: CmdContext<NsDelGroup.IArgs, NsDelGroup.IResult, NsDelGroup.ICmdHooks>;
    /** 执行Cmd */
    execute = async () => {
        const { args, hooks: runtimeHook } = this.ctx.getArgs()
        const hooks = this.ctx.getHooks()

        const result = await hooks.delGroup.call(
            args,
            async handlerArgs => {
                const graph = await this.ctx.getX6Graph()
                const { nodeConfig, commandService, deleteService: deleteGroupService } = handlerArgs

                const { id } = nodeConfig.ngArguments.data
                const node = graph.getCellById(id)

                if (deleteGroupService) {
                    const canDel = await deleteGroupService(handlerArgs)
                    if (!canDel) return { err: 'service rejected' }
                }

                if (!node) {
                    return { err: 'target node is not exist' }
                }
                // 不是Group的节点不能解散
                if (node.getProp('isGroup') !== true) {
                    return { err: 'target node is not group' }
                }

                const { isCollapsed } = node.getData()
                if (isCollapsed) {
                    await commandService.executeCommand(XFlowGroupCommands.COLLAPSE_GROUP.id, {
                        nodeId: node.id,
                        isCollapsed: false,
                        collapsedSize: { width: 0, height: 0 },
                    })
                }

                const childrens = node.getChildren()
                if (childrens) {
                    childrens.forEach(child => {
                        node.unembed(child)
                        child.prop('group', '')
                        child.setData({
                            ...child.getData(),
                            group: '',
                        })
                    })
                }

                await commandService.executeCommand(XFlowNodeCommands.DEL_NODE.id, {
                    nodeConfig: {
                        ...nodeConfig,
                        id: nodeConfig.ngArguments.data.id
                    },
                })

                /** add undo: delete node */
                this.ctx.addUndo(
                    Disposable.create(async () => {
                        commandService.executeCommand(XFlowGroupCommands.ADD_GROUP.id, {
                            nodeConfig,
                        })
                    }),
                )

                return { err: null }
            },
            runtimeHook,
        )

        this.ctx.setResult(result)

        return this
    }

    /** undo cmd */
    undo = async () => {
        if (this.isUndoable()) {
            this.ctx.undo()
        }
        return this
    }

    /** redo cmd */
    redo = async () => {
        if (!this.isUndoable()) {
            await this.execute()
        }
        return this
    }

    isUndoable(): boolean {
        return this.ctx.isUndoable()
    }
}
export namespace NsDelGroup {
    /** Command: 用于注册named factory */
    export const command = XFlowGroupCommands.DEL_GROUP
    /** hook 参数类型 */
    export interface IArgs extends IArgsBase {
        /** 群组节点的元数据 */
        nodeConfig: NsGraph.IGroupConfig
        /** 更新群组节点的元数据的异步方法 */
        deleteService?: IDeleteGroupService
    }
    /** add group api service 类型 */
    export interface IDeleteGroupService {
        (args: IArgs): Promise<boolean>
    }
    /** hook handler 返回类型 */
    export interface IResult {
        err: string | null
    }
    /** hookName */
    export const hookKey = 'delGroup' as const
    /** hooks 类型 */
    export interface ICmdHooks extends IHooks {
        delGroup: HookHub<IArgs, IResult>
    }
}