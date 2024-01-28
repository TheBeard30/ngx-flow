import { IAnchor, IMenuModel, IMenuTarget } from '@/app/flow-core/interfaces';
import { DisposableCollection } from '@/app/flow-core/common/disposable';
import * as MODELS from '@/app/flow-core/constants/model-constant';

export namespace CONTEXT_MENU_MODEL {
  export const id = 'CONTEXT_MENU_MODEL';
  export interface IState {
    anchor: IAnchor;
    target: IMenuTarget;
    menuModel: IMenuModel;
    toDispose: DisposableCollection;
  }

  export const useValue = MODELS.useModelValueUtil<IState>(id);
  export const getModel = MODELS.getModelUtil<IState>(id);
}
