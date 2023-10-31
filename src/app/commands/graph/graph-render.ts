import { XFlowGraphCommands } from '@/app/constants';
import { Graph } from '@antv/x6';
import { CmdContext } from '@/app/commands';

export class GraphRenderCommand {
  token: string = XFlowGraphCommands.GRAPH_RENDER.id;

  // 需要一个上下文
  ctx: CmdContext;
  // TODO 进行测试
  args;
  graph: Graph;
  async execute() {
    const graph = this.graph;
    const args = this.args;
    const { graphData } = args;
    const { nodes, edges } = graphData;

    graph.addNodes(nodes);
    graph.addEdges(edges);
  }
}
