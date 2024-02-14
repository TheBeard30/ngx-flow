import { AfterViewInit, ChangeDetectorRef, Component, Input } from '@angular/core';
import { CANVAS_SCALE_TOOLBAR_CONFIG } from './config/scale-toolbar-config';
import { IToolbarItemOptions } from '@/app/flow-core/toolbar/interface';
import * as MODELS from '@/app/flow-core/constants/model-constant';
import { ModelService } from '@/app/flow-core/services';
import { IPosition } from '@/app/flow-core/interfaces';

@Component({
  selector: 'app-flow-canvas-scale-toolbar',
  templateUrl: './flow-canvas-scale-toolbar.component.html',
  styleUrls: ['./flow-canvas-scale-toolbar.component.less']
})
export class FlowCanvasScaleToolbarComponent implements AfterViewInit {
  toolbarGroup: IToolbarItemOptions[] = [];

  @Input() position: IPosition;

  @Input() style: { [p: string]: any };

  constructor(
    private modelService: ModelService,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    MODELS.GRAPH_SCALE.useValue(this.modelService).then(graphScale => {
      this.toolbarGroup = CANVAS_SCALE_TOOLBAR_CONFIG.getToolbarConfig({
        zoomFactor: graphScale.zoomFactor,
        fullscreen: false
      });

      MODELS.GRAPH_FULLSCREEN.getModel(this.modelService).then(model => {
        /** 初始化全屏默认值 */
        model.setValue(false);
        /** 全屏 */
        model.watch(fullscreen => {
          this.toolbarGroup = CANVAS_SCALE_TOOLBAR_CONFIG.getToolbarConfig({
            zoomFactor: graphScale.zoomFactor,
            fullscreen
          });
          console.log('GRAPH_FULLSCREEN>>>', this.toolbarGroup);
        });
      });
    });

    MODELS.GRAPH_SCALE.getModel(this.modelService).then(model => {
      model.watch(async ({ zoomFactor }) => {
        const fullscreen = await MODELS.GRAPH_FULLSCREEN.useValue(this.modelService);
        this.toolbarGroup = CANVAS_SCALE_TOOLBAR_CONFIG.getToolbarConfig({
          zoomFactor,
          fullscreen
        });
      });
    });
  }
}
