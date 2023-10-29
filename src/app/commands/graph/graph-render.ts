import { XFlowGraphCommands } from '@/app/constants';
import { IContext } from '@/app/commands/interface';
import { Graph } from '@antv/x6';

export class GraphRenderCommand {
  token: string = XFlowGraphCommands.GRAPH_RENDER.id;

  // TODO 进行测试
  args;
  graph: Graph;
  async execute() {
    const graph = await this.graph;
    const args = this.args;
    const { graphData } = args;
    const { nodes, edges } = graphData;

    graph.addNodes(nodes);
    graph.addEdges(edges);
  }
}
