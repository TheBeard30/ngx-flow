import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IToolbarItemOptions } from '@/app/flow-core/toolbar/interface';
import { CommandService, ModelService } from '@/app/flow-core/services';
import { NSToolbarConfig } from './config/toolbar-config';
import { getPositionStyle, IPosition } from '@/app/flow-core/interfaces';

@Component({
  selector: 'app-flow-canvas-toolbar',
  templateUrl: './flow-canvas-toolbar.component.html',
  styleUrls: ['./flow-canvas-toolbar.component.less']
})
export class FlowCanvasToolbarComponent implements OnInit, OnChanges {
  @Input() config: IToolbarItemOptions[];

  @Input() position: IPosition;

  @Input() style: { [p: string]: any };

  toolbarGroup: IToolbarItemOptions[] = [];

  containerStyle: { [p: string]: any } = {};

  constructor(
    public commandService: CommandService,
    public modelService: ModelService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config && changes.config.currentValue) {
      this.toolbarGroup = this.config;
    }

    if (changes.position && changes.position.currentValue) {
      this.setContainerStyle();
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

  setContainerStyle() {
    const positionStyle = getPositionStyle(this.position);
    this.containerStyle = {
      ...positionStyle,
      ...this.style
    };
  }
}
