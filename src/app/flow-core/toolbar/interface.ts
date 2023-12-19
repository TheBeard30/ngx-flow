import { IGraphCommandService } from "../interfaces"
import { IModelService } from "../interfaces/model.interface"


/** 描述toolbar的一个按钮 */
export interface IToolbarItemOptions{
  /**  The unique ID of the toolbar item. */
  id: string
  /** 是否可见 */
  isVisible?: boolean
  /** 是否可用 */
  isEnabled?: boolean
  /** Optional text of the item. */
  text?: string
  /** Optional tooltip for the item. */
  tooltip?: string
  /** React element to be used as an icon for the menu item; optional */
  icon?: string
  /** Optional icon for the item. */
  iconName?: string
  /** 是否激活 */
  active?: boolean
  /** runtime 处理context */
  //useModel?: IUseModel<IToolbarItemOptions>
  /** 自定义渲染 */
  //render?: React.FC<ICustomRenderProps>
  /** Optional icon for the item. */
  onClick?: (args: IClickArgs) => void
}

export interface IClickArgs {
  toolbarItem: IToolbarItemOptions
  commandService: IGraphCommandService
  modelService: IModelService
}

