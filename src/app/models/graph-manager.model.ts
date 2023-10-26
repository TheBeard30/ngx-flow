import { Graph } from '@antv/x6';

export interface IGraphManger {
  getGraph: (graphId: string) => Promise<Graph>;
}

export class GraphManager implements IGraphManger {
  getGraph(graphId: string): Promise<Graph> {
    return Promise.resolve(undefined);
  }
}
