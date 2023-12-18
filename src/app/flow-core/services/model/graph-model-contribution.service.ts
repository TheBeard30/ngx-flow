import { Injectable } from '@angular/core';
import { GraphProviderService } from '@/app/flow-core/services/graph-provider.service';
import { IModelService } from '@/app/flow-core/interfaces/model.interface';
import * as MODELS from '@/app/flow-core/constants/model-constant';
import type { EventArgs } from '@antv/x6/lib/graph/events';
import { Disposable } from '@/app/flow-core/common/disposable';

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
    registry.registerModel<MODELS.GRAPH_META.IState>({
      id: MODELS.GRAPH_META.id,
      getInitialValue: () => ({
        flowId: '-1'
      }),
      watchChange: async self => {
        return Disposable.create(() => {
          self.setValue({ flowId: '-1' });
        });
      }
    });
    /** Graph 多选状态 */
    registry.registerModel<MODELS.GRAPH_ENABLE_MULTI_SELECT.IState>({
      id: MODELS.GRAPH_ENABLE_MULTI_SELECT.id,
      getInitialValue: () => ({
        isEnable: false
      }),
      watchChange: async self => {
        return Disposable.create(() => {
          self.setValue({ isEnable: false });
        });
      }
    });
    /** Graph 全屏 */
    registry.registerModel<MODELS.GRAPH_FULLSCREEN.IState>({
      id: MODELS.GRAPH_FULLSCREEN.id,
      getInitialValue: () => false,
      watchChange: async (self, modelService) => {
        const handleFullScreenChange = async () => {
          const fullscreen = !!document.fullscreenElement;
          const fullscreenModel = await MODELS.GRAPH_FULLSCREEN.getModel(modelService);
          fullscreenModel.setValue(fullscreen);
        };
        document.addEventListener('fullscreenchange', handleFullScreenChange, false);
        return Disposable.create(() => {
          document.removeEventListener('fullscreenchange', handleFullScreenChange);
          self.setValue(false);
        });
      }
    });
    /** 选中Cells状态 */
    registry.registerModel<MODELS.SELECTED_CELLS.IState>({
      id: MODELS.SELECTED_CELLS.id,
      getInitialValue: () => [],
      watchChange: async self => {
        const { graph } = await this.getGraphInstance();
        // @ts-ignore
        const onChange = (e: EventArgs['selection:changed']) => {
          const { selected } = e;
          self.setValue(selected);
        };
        graph.on('selection:changed', onChange);
        return Disposable.create(() => graph.off('selection:changed', onChange));
      }
    });
    /** 选中Cell状态 */
    registry.registerModel<MODELS.SELECTED_CELL.IState>({
      id: MODELS.SELECTED_CELL.id,
      watchChange: async (self, modelService) => {
        const cellsModel = await MODELS.SELECTED_CELLS.getModel(modelService);
        return cellsModel.watch((cells = []) => {
          self.setValue([...cells].pop() || null);
        });
      }
    });
  }
}
