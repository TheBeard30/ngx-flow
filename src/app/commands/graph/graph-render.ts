import { XFlowGraphCommands } from '@/app/constants';
import { Graph } from '@antv/x6';
import { CmdContext } from '@/app/commands';
import { Inject, Injectable, Injector } from '@angular/core';
import { GraphProviderService, ModelService } from '@/app/services';

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
