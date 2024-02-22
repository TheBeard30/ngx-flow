import { Disposable, DisposableCollection } from '@/app/flow-core/common/disposable';
import { IModelService } from '@/app/flow-core/interfaces/model.interface';
import { Cell } from '@antv/x6';
import { ISchema, TargetData, TargetType } from '@/app/flow-extension/editor-panel/interface';
import * as MODELS from '@/app/flow-core/constants/model-constant';
import { IGraphCommandService } from '@/app/flow-core/interfaces';
import { XFlowModelCommands } from '@/app/flow-core/constants';
import { Application } from '@/app/flow-core/models';

export namespace NsJsonSchemaFormModel {
  export const id = 'XFLOW_JSON_SCHEMA_FORM';
  export interface IState {
    loading: boolean;
    schema: ISchema;
    targetType: TargetType;
    targetData: TargetData;
    targetCell: Cell | null;
  }
  export const useModel = async (model: IModelService) => {
    return model.awaitModel<IState>(id);
  };
}

/** 方便其他组件执行Command改变Panel内部状态 */
export const executeJsonSchemaFormCommand = (
  cmds: IGraphCommandService,
  updateModel: (state: NsJsonSchemaFormModel.IState) => Promise<void>
) => {
  cmds.executeCommand(XFlowModelCommands.UPDATE_MODEL.id, {
    getModel: async modelService => {
      return NsJsonSchemaFormModel.useModel(modelService);
    },
    updateModel: updateModel
  });
};

export const useJsonFormModal = (props: {
  app: Application;
  formSchemaService: any;
  targetType: string[];
  callback: (ev) => void;
}) => {
  const { app, formSchemaService } = props;
  if (!app || !app.modelService) {
    return null;
  }
  const { commandService, modelService } = app;
  const collection = new DisposableCollection();
  const model = app.modelService.findDeferredModel(NsJsonSchemaFormModel.id);
  if (!model) {
    const d = app.modelService.registerModel({
      id: NsJsonSchemaFormModel.id,
      watchChange: async (self, modelService) => {
        const selectedCellModel = await MODELS.SELECTED_CELL.getModel(modelService);
        const nodeDisposable = selectedCellModel.watch(async cell => {
          console.log('cell>>>', cell);
          const getCellType = (targetCell: Cell): TargetType => {
            if (!targetCell) {
              return 'canvas';
            } else if (targetCell.isNode && targetCell.isNode() && targetCell.getProp('isGroup')) {
              return 'group';
            } else if (targetCell.isNode && targetCell.isNode() && targetCell.shape === 'er-node') {
              return 'er';
            } else if (targetCell.isNode && targetCell.isNode()) {
              return 'node';
            } else if (targetCell.isEdge && targetCell.isEdge()) {
              return 'edge';
            } else {
              return 'canvas';
            }
          };
          const targetCellType = getCellType(cell);
          const updateState = async (targetCell: Cell, type: TargetType) => {
            self.setValue(m => {
              m.loading = true;
              m.schema = { tabs: [] };
              m.targetType = null;
              m.targetData = null;
              m.targetCell = null;
            });
            const targetData = targetCell ? targetCell.getData() : null;
            if (!formSchemaService) {
              return;
            }
            const graph = await app.getGraphInstance();
            const schema = await formSchemaService({
              commandService,
              modelService,
              targetData,
              cell: targetCell,
              targetType: type,
              graph
            });
            const v = {
              loading: false,
              schema: schema,
              targetType: type,
              targetCell: targetCell,
              targetData: targetData
            };
            self.setValue(v);
            props.callback(v);
          };

          if ((props.targetType || ['node', 'canvas']).includes(targetCellType)) {
            await updateState(cell, targetCellType);
          }
        });
        return Disposable.create(() => {
          nodeDisposable.dispose();
          collection.push(nodeDisposable);
        });
      }
    });
    collection.push(d);
  }
};
