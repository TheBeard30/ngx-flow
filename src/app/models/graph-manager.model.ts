import { Graph } from '@antv/x6';
import { IGraphConfig } from '@/app/interfaces';

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
        height: clientHeight
      });
      this.graphMap.set(graphId, graph);
    }

    return Promise.resolve(graph);
  }
}
