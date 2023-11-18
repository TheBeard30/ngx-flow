import { XFlowGraphCommands } from '@/app/flow-core/constants';
import { CmdContext } from '@/app/flow-core/commands';
import { Injectable } from '@angular/core';
import { NsGraph } from '@/app/flow-core/interfaces';
import { HookHub } from '@/app/flow-core/hooks/hookhub';
import { IHooks } from '@/app/flow-core/hooks/interface';

@Injectable({
  providedIn: 'root'
})
export class GraphRenderCommand {
  token: string = XFlowGraphCommands.GRAPH_RENDER.id;

  // 需要一个上下文
  ctx: CmdContext;

  async execute() {
    const graph = await this.ctx.getX6Graph();
    const { args } = this.ctx.getArgs();
    const { graphData } = args;
    const { nodes, edges } = graphData;

    graph.addNodes(nodes);
    graph.addEdges(edges);
  }
}

export namespace NsGraphRender {
  /** Command: 用于注册named factory */
  export const command = XFlowGraphCommands.GRAPH_RENDER;

  /** hookName */
  export const hookKey = 'graphRender';

  export interface IArgs {
    /** 画布渲染之前的钩子(比如从服务端获取数据、对数据做布局处理等) */
    beforeRender?: (graphMeta?: NsGraph.IGraphMeta) => Promise<NsGraph.IGraphData>;
    /** 画布渲染完成之后的钩子 */
    afterRender?: (graphData: NsGraph.IGraphData, graphMeta?: NsGraph.IGraphMeta) => Promise<any> | undefined;

    /** 画布渲染数据(nodes、edges) */
    graphData: NsGraph.IGraphData;

    /** 用户自定义方法判断节点内容是否相等 */
    isNodeEqual?: (curNodeConfig: NsGraph.INodeConfig, nextNodeConfig: NsGraph.INodeConfig) => boolean;
    /** 用户自定义方法判断边内容是否相等 */
    isEdgeEqual?: (curEdgeConfig: NsGraph.IEdgeConfig, nextEdgeConfig: NsGraph.IEdgeConfig) => boolean;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface IResult {}

  /** hooks 类型 */
  export interface ICmdHooks extends IHooks {
    graphRender: HookHub<IArgs, IResult>;
  }
}
