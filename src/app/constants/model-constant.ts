import { IGraphMeta } from '@/app/interfaces';
import { IModelService, Token } from '@/app/interfaces/model.interface';
import { Cell } from '@antv/x6';

/** useModel的Utils */
export const getModelUtil =
  <T>(token: Token<T>) =>
  async (modelService: IModelService) => {
    return await modelService.awaitModel<T>(token);
  };

/** useModel的Utils */
export const useModelValueUtil =
  <T>(token: Token<T>) =>
  async (modelService: IModelService) => {
    const model = await modelService.awaitModel<T>(token);
    return model.getValidValue();
  };

/** 画布元数据状态 */
export namespace GRAPH_META {
  export const id = 'GRAPH_META';
  export type IState = IGraphMeta;
  export const getModel = getModelUtil<IState>(id);
  export const useValue = useModelValueUtil<IState>(id);
}

/** 画布是否已开启多选 */
export namespace GRAPH_ENABLE_MULTI_SELECT {
  export const id = 'GRAPH_ENABLE_MULTI_SELECT';
  export type IState = {
    isEnable: boolean;
  };
  export const getModel = getModelUtil<IState>(id);
  export const useValue = useModelValueUtil<IState>(id);
}

/** 画布是否全屏 */
export namespace GRAPH_FULLSCREEN {
  export const id = 'GRAPH_FULLSCREEN';
  export type IState = boolean;
  export const getModel = getModelUtil<IState>(id);
  export const useValue = useModelValueUtil<IState>(id);
}
/** 画布已选中节点 */
export namespace IS_NODE_SELECTED {
  export const id = 'IS_NODE_SELECTED';
  export type IState = boolean;
  export const getModel = getModelUtil<IState>(id);
  export const useValue = useModelValueUtil<IState>(id);
}
/** 画布选中节点是Group */
export namespace IS_GROUP_SELECTED {
  export const id = 'IS_GROUP_SELECTED';
  export type IState = boolean;
  export const getModel = getModelUtil<IState>(id);
  export const useValue = useModelValueUtil<IState>(id);
}
/** 画布选中节点是Group */
export namespace IS_NORMAL_NODES_SELECTED {
  export const id = 'IS_NORMAL_NODES_SELECTED';
  export type IState = boolean;
  export const getModel = getModelUtil<IState>(id);
  export const useValue = useModelValueUtil<IState>(id);
}
/** 画布选中Cell状态，保存最后一个选中的节点 */
export namespace SELECTED_CELL {
  export const id = 'LAST_SELECTED_CELL';
  export type IState = Cell | null;
  export const getModel = getModelUtil<IState>(id);
  export const useValue = useModelValueUtil<IState>(id);
}
/** 画布选中CellS状态 */
export namespace SELECTED_CELLS {
  export const id = 'SELECTED_CELLS';
  export type IState = Cell[];
  export const getModel = getModelUtil<IState>(id);
  export const useValue = useModelValueUtil<IState>(id);
}
