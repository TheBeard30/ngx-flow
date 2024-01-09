import { Component, Input, OnInit } from '@angular/core';
import { IToolbarItemOptions } from '@/app/flow-core/toolbar/interface';
import { CommandService, ModelService } from '@/app/flow-core/services';
import { NSToolbarConfig } from './config/toolbar-config';

@Component({
  selector: 'app-flow-canvas-toolbar',
  templateUrl: './flow-canvas-toolbar.component.html',
  styleUrls: ['./flow-canvas-toolbar.component.less']
})
export class FlowCanvasToolbarComponent implements OnInit {
  @Input() config: IToolbarItemOptions[];
  toolbarGroup: IToolbarItemOptions[] = []

  constructor(public commandService: CommandService, public modelService: ModelService) {
  }

  ngOnInit(): void {
    if (this.config) {
      this.toolbarGroup = this.config;
    } else {
      NSToolbarConfig.getDependencies(this.modelService).then(
        models => {
          models.map(model => {
            model.watch(async () => {
              NSToolbarConfig.getToolbarState(this.modelService).then(state => {
                NSToolbarConfig.getToolbarItems(state).then(items => {
                  this.toolbarGroup = items;
                });
              })
            })
          })
        }
      )
    }

  }

}
