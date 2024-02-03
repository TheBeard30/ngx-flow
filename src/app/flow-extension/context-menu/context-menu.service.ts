import { IMenu, IModel } from '@/app/flow-core/providers/injection';
import { Injectable } from '@angular/core';
import { CONTEXT_MENU_MODEL } from '@/app/flow-extension/context-menu/context-menu.interface';
import { IModelService } from '@/app/flow-core/interfaces/model.interface';
import * as MODELS from '@/app/flow-core/constants/model-constant';
import { Disposable, DisposableCollection } from '@/app/flow-core/common/disposable';
import { IMenuOptions, MenuItemType } from '@/app/flow-core/interfaces';
import { RxModel } from '@/app/flow-core/common/rx-model';
import { ModelService } from '@/app/flow-core/services';
import { ContextMenuConfig } from '@/app/flow-extension/context-menu/context-menu.config';

@Injectable({
  providedIn: 'root'
})
export class ContextMenuService implements IModel {
  toDispose = new DisposableCollection();

  menuConfig: ContextMenuConfig;
  constructor(private modelService: ModelService) {}

  /** 获取 MenuModel */
  getMenuModelValue = async (contextMenuInfo: MODELS.CONTEXTMENU_TARGET.IState) => {
    const config = this.menuConfig.getConfig();
    /** 获取坐标 */
    const { anchor, type, cell } = contextMenuInfo;
    /** 获取Menu */
    const toDispose = new DisposableCollection();
    this.toDispose.push(toDispose);
    const data = cell ? cell.getData<any>() : null;
    // fix: 修改删除边的时候没有ID的问题
    if (!data.id) {
      data.id = cell.id;
    }
    const menuModel = new RxModel<IMenuOptions>({
      id: 'menuroot',
      type: MenuItemType.Root,
      submenu: []
    });
    toDispose.push(
      Disposable.create(() => {
        menuModel.dispose();
      })
    );
    const renderProps: CONTEXT_MENU_MODEL.IState = {
      toDispose,
      anchor: anchor,
      target: { data, type },

      menuModel: menuModel
    };

    if (config.menuModelService) {
      await config.menuModelService(contextMenuInfo, renderProps.menuModel, this.modelService, toDispose);
    }

    return renderProps;
  };
  registerModel(registry: IModelService): void {
    const toDispose = [
      registry.registerModel<CONTEXT_MENU_MODEL.IState>({
        id: CONTEXT_MENU_MODEL.id,
        getInitialValue: () => null,
        watchChange: async (self, modelService) => {
          const contextMenuModel = await MODELS.CONTEXTMENU_TARGET.getModel(modelService);
          return contextMenuModel.watch(async contextMenuInfo => {
            const contextMenuValue = await this.getMenuModelValue(contextMenuInfo);
            self.setValue(contextMenuValue);
          });
        }
      })
    ];
    this.toDispose.pushAll(toDispose);
  }
}
