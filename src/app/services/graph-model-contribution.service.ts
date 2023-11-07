import { Injectable } from '@angular/core';
import { GraphProviderService } from '@/app/services/graph-provider.service';

@Injectable({
  providedIn: 'root'
})
export class GraphModelContribution {
  constructor(private graphProvider: GraphProviderService) {}

  getGraphInstance = async () => {
    const graphInstance = await this.graphProvider.getGraphInstance();
    const graphConfig = await this.graphProvider.getGraphOptions();

    return { graph: graphInstance, config: graphConfig };
  };
}
