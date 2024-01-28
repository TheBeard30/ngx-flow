import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { ContextMenuConfig } from '@/app/flow-extension/context-menu/context-menu.config';
import { CONTEXT_MENU_MODEL } from '@/app/flow-extension/context-menu/context-menu.interface';
import { ModelService } from '@/app/flow-core/services';
import { ContextMenuService } from '@/app/flow-extension/context-menu/context-menu.service';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.less']
})
export class ContextMenuComponent implements AfterViewInit, OnChanges {
  @ViewChild('menu') contextmenu: NzDropdownMenuComponent;

  @Input() config: ContextMenuConfig = new ContextMenuConfig();

  constructor(
    private nzContextMenuService: NzContextMenuService,
    private modelService: ModelService,
    private contextMenuService: ContextMenuService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config && changes.config.currentValue) {
      this.contextMenuService.menuConfig = this.config;
    }
    throw new Error('Method not implemented.');
  }

  ngAfterViewInit(): void {
    this.contextMenuService.menuConfig = this.config;
    this.contextMenuService.registerModel(this.modelService);
    CONTEXT_MENU_MODEL.getModel(this.modelService).then(model => {
      model.watch(value => {
        console.log('CONTEXT_MENU_MODEL');
        console.log(value);
        const { anchor } = value;
        const event = new MouseEvent('click', {
          clientX: anchor.x,
          clientY: anchor.y
        });
        this.nzContextMenuService.create(event, this.contextmenu);
      });
    });
  }

  openMenu(event: MouseEvent) {
    this.nzContextMenuService.create(event, this.contextmenu);
  }

  closeMenu() {
    this.nzContextMenuService.close(true);
  }
}
