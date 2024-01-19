import { Injectable } from "@angular/core";
import { XFlowGraphCommands } from "../../constants/global";
import { HookHub } from "../../hooks/hookhub";
import { IHooks } from "../../hooks/interface";
import { NsGraph } from "../../interfaces";
import { CmdContext } from "../cmd-context";
import { IArgsBase } from "../interface";

@Injectable({
    providedIn: 'root'
})
export class GraphSaveDataCommand {
    token: string = XFlowGraphCommands.SAVE_GRAPH_DATA.id;

    ctx: CmdContext<NsGraphSaveData.IArgs, NsGraphSaveData.IResult, NsGraphSaveData.ICmdHooks>;

    /** 执行Cmd */
    execute = async () => {
        const args = this.ctx.getArgs()
        const hooks = this.ctx.getHooks()

        /** 执行hooks */
        await hooks.saveGraphData.call(
            /** 执行hooks pipeline处理args */
            args.args,
            /** 执行 callback */
            async handlerArgs => {
                const { saveGraphDataService, includeAttrs } = handlerArgs
                const x6Graph = await this.ctx.getX6Graph()
                const x6Nodes = x6Graph.getNodes()
                const x6Edges = x6Graph.getEdges()

                const nodes = x6Nodes.map(node => {
                    const data = node.getData<NsGraph.INodeConfig>()
                    const position = node.position()
                    const size = node.size()
                    const model = {
                        id: node.id,
                        ...data,
                        ...position,
                        ...size,
                    }
                    if (includeAttrs) {
                        model.attrs = node.getAttrs()
                    }
                    return model
                })

                const edges = x6Edges.map(edge => {
                    const data = edge.getData<NsGraph.IEdgeConfig>()
                    const model = {
                        id: edge.id,
                        ...data,
                    }
                    if (includeAttrs) {
                        model.attrs = edge.getAttrs()
                    }
                    return model
                })

                const graphData = { nodes, edges }
                const graphMeta = await this.ctx.getGraphMeta()
                localStorage.setItem('graphData-edges', graphData.edges.toString());
                localStorage.setItem('graphData-nodes', graphData.nodes.toString());
                //localStorage.setItem('graphMeta', graphMeta.);
                /** 执行 service */
                if (saveGraphDataService) {
                    const result = await saveGraphDataService(graphMeta, graphData)
                    /** 设置结果 */
                    if (result) {
                        this.ctx.setResult(result)
                    }
                }
                return {}
            },
            /** 外部的 hook */
            args.hooks,
        )

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
export namespace NsGraphSaveData {
    /** Command Id: 用于注册named factory */
    export const command = XFlowGraphCommands.SAVE_GRAPH_DATA
    /** hookName */
    export const hookKey = 'saveGraphData'
    /** hook 参数类型 */
    export interface IArgs extends IArgsBase {
        includeAttrs?: boolean
        saveGraphDataService?: ISaveGraphDataService
    }
    /** hook handler 返回类型 */
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface IResult { }
    /** api service 类型 */
    export interface ISaveGraphDataService {
        (graphMeta: NsGraph.IGraphMeta, graphData: NsGraph.IGraphData): Promise<IResult | void>
    }
    /** hooks 类型 */
    export interface ICmdHooks extends IHooks {
        saveGraphData: HookHub<IArgs, IResult>
    }
}