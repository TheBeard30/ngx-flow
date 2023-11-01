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

  constructor(private injector: Injector) {
    // const commandService = injector.get(CommandInjectionToken);
    const graphProvider = injector.get(GraphProviderService);
    const modelService = injector.get(ModelService);
    this.ctx = new CmdContext<any>(graphProvider, modelService);
  }
  // TODO 进行测试
  args;
  graph: Graph;
  async execute() {
    const graph = await this.ctx.getX6Graph();
    const args = this.args;
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
