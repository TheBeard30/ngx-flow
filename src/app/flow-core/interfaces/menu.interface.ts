import { NsGraph } from '@/app/flow-core/interfaces/graph.interface';
import { IGraphCommandService } from '@/app/flow-core/interfaces/graph-command.interface';
import { IModelService } from '@/app/flow-core/interfaces/model.interface';
import * as MODELS from '@/app/flow-core/constants/model-constant';
import { Disposable } from '../common/disposable';
import { RxModel } from '@/app/flow-core/common/rx-model';

export enum MenuItemType {
  Separator = 'separator',
  Submenu = 'submenu',
  Root = 'root',
  Leaf = 'leaf'
}

export interface IAnchor {
  x: number;
  y: number;
}

export interface IMenuTarget {
  type: MODELS.CONTEXTMENU_TARGET.TargetType;
  data: NsGraph.INodeConfig | NsGraph.IEdgeConfig | null;
}

export type IMenuModel = RxModel<IMenuOptions>;

export interface IClickArgs {
  menuItem: IMenuOptions;
  target: IMenuTarget;
  commandService: IGraphCommandService;
  modelService: IModelService;
}

export interface IMenuOptions<T = any> {
  /** The type of the menu item. */
  id: string;
  /** The type of the menu item. */
  type?: MenuItemType;
  /** The submenu id  */
  submenu?: IMenuOptions[];
  /** The display label for the menu item. */
  label?: string;
  /** Whether submenu is active */
  active?: boolean;
  /** The hotkey for the menu item */
  hotkey?: string;
  /** The icon label for the menu item */
  iconName?: string;
  /** Whether the menu item is enabled  */
  isEnabled?: boolean;
  /** Whether the menu item is visible */
  isVisible?: boolean;
  /** data. */
  data?: T;
  /** 自定义渲染 */
  render?: any;
  /** onClick */
  onClick?: (args: IClickArgs) => Promise<void>;
}

export interface IMenuService {
  /**
   * 注册 menu
   * @param config IMenuOptions
   */
  registerMenu: (config: IMenuOptions) => Disposable;

  /**
   * 获取menu model
   * @param menuId  menu id
   */
  getMenu: (menuId: string) => IMenuOptions;
}
