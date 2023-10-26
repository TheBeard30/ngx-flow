import { IGraphConfig, IGraphProvider } from '@/app/interfaces';
import { Injectable } from '@angular/core';

import { Graph } from '@antv/x6';

@Injectable({
  providedIn: 'root'
})
export class GraphProviderService implements IGraphProvider {
  private graphInstance: Graph;

  private graphConfig: IGraphConfig;

  getGraphInstance(): Promise<Graph> {
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
  }
}
