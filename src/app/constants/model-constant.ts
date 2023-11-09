import { IGraphMeta } from '@/app/interfaces';
import { IModelService, Token } from '@/app/interfaces/model.interface';

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
