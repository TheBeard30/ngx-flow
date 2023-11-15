import { Graph } from '@antv/x6';
import { IGraphConfig } from '@/app/flow-core/interfaces';

export interface IGraphManger {
  getGraph: (graphId: string) => Promise<Graph>;
}

export class GraphManager implements IGraphManger {
  /** 储存画布实例 */
  private graphMap = new Map<string, Graph>();

  private config: IGraphConfig;
  getGraph(graphId: string): Promise<Graph> {
    let graph = this.graphMap.get(graphId);
    if (!graph) {
      const { graphContainer } = this.config;
      const { clientHeight, clientWidth } = graphContainer;
      /** 实例化 X6 Graph */
      graph = new Graph({
        container: graphContainer,
        width: clientWidth,
        height: clientHeight,
        ...this.config.x6Options
      });
      this.graphMap.set(graphId, graph);
      graph.on('node:moved', ({ node }) => {
        const nodeData = node.getData();
        const position = node.position();
        node.setData({
          ...nodeData,
          x: position?.x,
          y: position?.y
        });
      });
      graph.on('node:resized', ({ node }) => {
        const nodeData = node.getData();
        const size = node.size();
        node.setData({
          ...nodeData,
          width: size?.width,
          height: size?.height
        });
      });
    }

    return Promise.resolve(graph);
  }

  // TODO TEST
  setConfig(config: IGraphConfig) {
    this.config = config;
  }
}
