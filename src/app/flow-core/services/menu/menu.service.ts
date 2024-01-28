import { Inject, Injectable, Optional } from '@angular/core';
import { Disposable, DisposableCollection } from '@/app/flow-core/common/disposable';
import { IMenuOptions } from '@/app/flow-core/interfaces';
import { IMenu, MenuToken } from '@/app/flow-core/providers/injection';

@Injectable()
export class MenuService {
  private toDispose = new DisposableCollection();

  private menuMap = new Map<string, IMenuOptions>();

  constructor(@Inject(MenuToken) @Optional() private iMenu: IMenu[]) {}

  onStart() {
    if (this.iMenu) {
      for (const menu of this.iMenu) {
        menu.registerMenu(this);
      }
    }
  }

  /** app的停止逻辑 */
  onStop(): void {
    this.toDispose.dispose();
  }
  /**
   * 注册 menu 类型
   * @param config IMenu
   */
  registerMenu(config: IMenuOptions) {
    this.menuMap.set(config.id, config);
    return Disposable.create(() => this.menuMap.delete(config.id));
  }
  /**
   * 获取 menu
   * @param menuId menuId
   */
  getMenu = (menuId: string) => {
    return this.menuMap.get(menuId);
  };
}
