import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IToolbarItemOptions } from '@/app/flow-core/toolbar/interface';
import { CommandService, ModelService } from '@/app/flow-core/services';
import { NSToolbarConfig } from './config/toolbar-config';

@Component({
  selector: 'app-flow-canvas-toolbar',
  templateUrl: './flow-canvas-toolbar.component.html',
  styleUrls: ['./flow-canvas-toolbar.component.less']
})
export class FlowCanvasToolbarComponent implements OnInit, OnChanges {
  @Input() config: IToolbarItemOptions[];
  toolbarGroup: IToolbarItemOptions[] = [];

  constructor(
    public commandService: CommandService,
    public modelService: ModelService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config && changes.config.currentValue) {
      this.toolbarGroup = this.config;
    }
  }

  ngOnInit(): void {
    if (this.config) return;
    NSToolbarConfig.getDependencies(this.modelService).then(models => {
      models.map(model => {
        model.watch(async () => {
          NSToolbarConfig.getToolbarState(this.modelService).then(state => {
            NSToolbarConfig.getToolbarItems(state).then(items => {
              this.toolbarGroup = items;
            });
          });
        });
      });
    });
  }
}
