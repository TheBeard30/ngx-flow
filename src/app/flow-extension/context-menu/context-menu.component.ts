import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { ContextMenuConfig } from '@/app/flow-extension/context-menu/context-menu.config';
import { CONTEXT_MENU_MODEL } from '@/app/flow-extension/context-menu/context-menu.interface';
import { ModelService } from '@/app/flow-core/services';
import { ContextMenuService } from '@/app/flow-extension/context-menu/context-menu.service';
import { IMenuOptions, IMenuTarget } from '@/app/flow-core/interfaces';
import { Application } from '@/app/flow-core/models';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.less']
})
export class ContextMenuComponent implements AfterViewInit, OnChanges {
  @ViewChild('menu') contextmenu: NzDropdownMenuComponent;

  @Input() config: ContextMenuConfig = new ContextMenuConfig();

  subMenu: IMenuOptions;

  target: IMenuTarget;

  constructor(
    private nzContextMenuService: NzContextMenuService,
    private modelService: ModelService,
    private contextMenuService: ContextMenuService,
    private app: Application
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config && changes.config.currentValue) {
      this.contextMenuService.menuConfig = this.config;
    }
  }

  ngAfterViewInit(): void {
    this.contextMenuService.menuConfig = this.config;
    this.contextMenuService.registerModel(this.modelService);
    CONTEXT_MENU_MODEL.getModel(this.modelService).then(model => {
      model.watch(value => {
        const { anchor, menuModel, target } = value;
        this.target = target;
        const event = new MouseEvent('click', {
          clientX: anchor.x,
          clientY: anchor.y
        });
        const modelValue = menuModel.getValue() as any;

        this.subMenu = modelValue.submenu[0];
        setTimeout(() => this.nzContextMenuService.create(event, this.contextmenu));
      });
    });
  }

  openMenu(event: MouseEvent) {
    this.nzContextMenuService.create(event, this.contextmenu);
  }

  closeMenu() {
    this.nzContextMenuService.close(true);
  }

  subMenuClick() {
    this.subMenu.onClick({
      menuItem: this.subMenu,
      modelService: this.app.modelService,
      commandService: this.app.commandService,
      target: this.target
    });
  }
}
