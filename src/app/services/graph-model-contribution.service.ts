import { Injectable } from '@angular/core';
import { GraphProviderService } from '@/app/services/graph-provider.service';
import { IModelService } from '@/app/interfaces/model.interface';
import { GRAPH_META } from '@/app/constants/model-constant';

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

  registerModel(registry: IModelService) {
    registry.registerModel<GRAPH_META.IState>({
      id: GRAPH_META.id,
      getInitialValue: () => ({
        flowId: '-1'
      }),
      watchChange: async self => {
        self.setValue({ flowId: '-1' });
      }
    });
  }
}
