import { Injectable } from '@angular/core';
import { GraphProviderService } from '@/app/services/graph-provider.service';
import { IModelService } from '@/app/interfaces/model.interface';
import { GRAPH_ENABLE_MULTI_SELECT, GRAPH_META } from '@/app/constants/model-constant';

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
    /** Graph 多选状态 */
    registry.registerModel<GRAPH_ENABLE_MULTI_SELECT.IState>({
      id: GRAPH_ENABLE_MULTI_SELECT.id,
      getInitialValue: () => ({
        isEnable: false
      }),
      watchChange: async self => {
        self.setValue({ isEnable: false });
      }
    });
  }
}
