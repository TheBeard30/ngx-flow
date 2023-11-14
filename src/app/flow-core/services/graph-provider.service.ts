import { IGraphConfig, IGraphProvider } from '@/app/flow-core/interfaces';
import { Injectable } from '@angular/core';

import { Graph } from '@antv/x6';
import { GraphManager } from '@/app/flow-core/models';

@Injectable({
  providedIn: 'root'
})
export class GraphProviderService implements IGraphProvider {
  private graphInstance: Graph;

  private graphConfig: IGraphConfig;

  private groupManager: GraphManager;

  constructor() {
    this.groupManager = new GraphManager();
  }

  async getGraphInstance(): Promise<Graph> {
    const graph = await this.groupManager.getGraph(this.graphConfig.graphId);
    this.graphInstance = graph;
    return Promise.resolve(this.graphInstance);
  }

  getGraphOptions(): Promise<IGraphConfig> {
    return Promise.resolve(this.graphConfig);
  }

  setGraphInstance(graph: Graph) {
    this.graphInstance = graph;
  }

  setGraphOptions(graphConfig: IGraphConfig) {
    this.graphConfig = graphConfig;
    this.groupManager.setConfig(this.graphConfig);
  }
}
