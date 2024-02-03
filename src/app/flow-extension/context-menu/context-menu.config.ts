import { DisposableCollection } from '@/app/flow-core/common/disposable';
import { RxModel } from '@/app/flow-core/common/rx-model';
import { IModelService } from '@/app/flow-core/interfaces/model.interface';
import * as MODELS from '@/app/flow-core/constants/model-constant';
import { IMenuOptions, MenuItemType, NsGraph } from '@/app/flow-core/interfaces';
import { uuidv4 } from '@/app/flow-core/models';
import { ContextMenuService } from '@/app/flow-extension/context-menu/context-menu.service';
import { NsNodeCmd, XFlowEdgeCommands, XFlowNodeCommands } from '@/app/flow-core/commands';
export class ContextMenuConfig {
  readonly CONFIG_TYPE = NsContextMenu.CONFIG_TYPE;

  private menuModelService!: NsContextMenu.IMenuModelService;

  /** instance id */
  readonly moduleId: string;
  /** uuid */
  constructor(moduleId?: string) {
    this.moduleId = moduleId || uuidv4();
  }

  setMenuModelService = (service: NsContextMenu.IMenuModelService) => {
    this.menuModelService = service;
  };

  getConfig = () => {
    return {
      CONFIG_TYPE: this.CONFIG_TYPE,
      menuModelService: this.menuModelService
    };
  };
}

export namespace NsContextMenu {
  export const CONFIG_TYPE = 'ContextMenuConfig';

  export interface IMenuModelService {
    (
      data: MODELS.CONTEXTMENU_TARGET.IState,
      model: RxModel<IMenuOptions>,
      modelService: IModelService,
      toDispose: DisposableCollection
    ): Promise<void>;
  }
}

export const createContextMenuConfig =
  <T = any>(addOptions: (config: ContextMenuConfig, proxy: { getValue: () => T }) => void) =>
  (props?: T) => {
    const proxy = { getValue: () => ({}) as T };
    proxy.getValue = () => props;

    const contextMenu = new ContextMenuConfig();
    addOptions(contextMenu, proxy);
    return contextMenu;
  };

export namespace NsMenuItemConfig {
  export const DELETE_EDGE: IMenuOptions = {
    id: XFlowEdgeCommands.DEL_EDGE.id,
    label: '删除边',
    iconName: 'delete',
    onClick: async ({ target, commandService }) => {
      commandService.executeCommand(XFlowEdgeCommands.DEL_EDGE.id, {
        edgeConfig: target.data as NsGraph.IEdgeConfig
      });
    }
  };

  export const DELETE_NODE: IMenuOptions = {
    id: XFlowNodeCommands.DEL_NODE.id,
    label: '删除节点',
    iconName: 'delete',
    onClick: async ({ target, commandService }) => {
      commandService.executeCommand<NsNodeCmd.DelNode.IArgs>(XFlowNodeCommands.DEL_NODE.id, {
        nodeConfig: { id: target.data.id }
      });
    }
  };

  export const EMPTY_MENU: IMenuOptions = {
    id: 'EMPTY_MENU_ITEM',
    label: '暂无可用',
    isEnabled: false,
    iconName: 'delete'
  };

  export const SEPARATOR: IMenuOptions = {
    id: 'separator',
    type: MenuItemType.Separator
  };
}

export const useMenuConfig = createContextMenuConfig(config => {
  config.setMenuModelService(async (target, model, modelService, toDispose) => {
    const { type, cell } = target;
    switch (type) {
      /** 节点菜单 */
      case 'node':
        model.setValue({
          id: 'root',
          type: MenuItemType.Root,
          submenu: [NsMenuItemConfig.DELETE_NODE]
        });
        break;
      /** 边菜单 */
      case 'edge':
        model.setValue({
          id: 'root',
          type: MenuItemType.Root,
          submenu: [NsMenuItemConfig.DELETE_EDGE]
        });
        break;
      /** 画布菜单 */
      case 'blank':
        model.setValue({
          id: 'root',
          type: MenuItemType.Root,
          submenu: [NsMenuItemConfig.EMPTY_MENU]
        });
        break;
      /** 默认菜单 */
      default:
        model.setValue({
          id: 'root',
          type: MenuItemType.Root,
          submenu: [NsMenuItemConfig.EMPTY_MENU]
        });
        break;
    }
  });
});
