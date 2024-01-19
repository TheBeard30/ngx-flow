import { Injectable } from "@angular/core";
import { XFlowGraphCommands } from "../constant";
import { MODELS } from "../../models";
import { IArgsBase, IContext } from "../interface";
import { HookHub } from "../../hooks/hookhub";
import { IHooks } from "../../hooks/interface";
import { CmdContext } from "../cmd-context";

@Injectable({
    providedIn: 'root'
})
export class GraphToggleMultiSelectCommand {
    token: string = XFlowGraphCommands.GRAPH_TOGGLE_MULTI_SELECT.id;


    ctx: CmdContext<NsGraphToggleMultiSelect.IArgs, NsGraphToggleMultiSelect.IResult, NsGraphToggleMultiSelect.ICmdHooks>

    /** 执行Cmd */
    execute = async () => {
        console.log(this.ctx)
        const { args, hooks: runtimeHook } = this.ctx.getArgs()
        const hooks = this.ctx.getHooks()
        const result = await hooks.toggleMultiSelect.call(
            /** 执行hooks pipeline处理args */
            args,
            /** 执行 callback */
            async handlerArgs => {
                const x6Graph = await this.ctx.getX6Graph()
                const config = await this.ctx.getGraphConfig()
                const { isEnable, modelService } = handlerArgs
                const graphEnableMultiSelectModel = await MODELS.GRAPH_ENABLE_MULTI_SELECT.getModel(
                    modelService,
                )
                const needEnableRubberBand: boolean =
                    typeof isEnable === 'boolean' ? isEnable : !x6Graph.isRubberbandEnabled()
                if (needEnableRubberBand) {
                    x6Graph.enableRubberband()
                    x6Graph.disablePanning()
                    config.graphContainer.style.cursor = 'crosshair'
                } else {
                    x6Graph.disableRubberband()
                    x6Graph.enablePanning()
                    config.graphContainer.style.cursor = 'grab'
                }
                graphEnableMultiSelectModel.setValue({ isEnable: needEnableRubberBand })
                return { isEnable: needEnableRubberBand }
            },
            /** execute command 时创建的hook */
            runtimeHook,
        )

        /** 设置结果 */
        this.ctx.setResult(result)
        return this
    }

    /** undo cmd */
    undo = async () => {
        this.ctx.undo()
        return this
    }

    /** redo cmd */
    redo = async () => {
        if (!this.ctx.isUndoable) {
            await this.execute()
        }
        return this
    }

    /** isUndoable */
    isUndoable(): boolean {
        return this.ctx.isUndoable()
    }
}
export namespace NsGraphToggleMultiSelect {
    /** Command: 用于注册named factory */
    export const command = XFlowGraphCommands.GRAPH_TOGGLE_MULTI_SELECT
    /** hookName */
    export const hookKey = 'toggleMultiSelect'
    /** hook 参数类型 */
    export interface IArgs extends IArgsBase {
        isEnable?: boolean
    }
    /** hook handler 返回类型 */
    export interface IResult {
        isEnable: boolean
    }
    /** hooks 类型 */
    export interface ICmdHooks extends IHooks {
        toggleMultiSelect: HookHub<IArgs, IResult>
    }
}