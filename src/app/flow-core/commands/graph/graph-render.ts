import { XFlowGraphCommands } from '@/app/flow-core/constants';
import { CmdContext } from '@/app/flow-core/commands';
import { Injectable } from '@angular/core';

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
}
