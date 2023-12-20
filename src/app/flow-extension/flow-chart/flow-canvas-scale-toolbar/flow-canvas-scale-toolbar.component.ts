import { Component } from '@angular/core';
import { SCALE_TOOLBAR_GROUP } from './config/scale-toolbar-config';
import { IToolbarItemOptions } from '@/app/flow-core/toolbar/interface';

@Component({
  selector: 'app-flow-canvas-scale-toolbar',
  templateUrl: './flow-canvas-scale-toolbar.component.html',
  styleUrls: ['./flow-canvas-scale-toolbar.component.less']
})
export class FlowCanvasScaleToolbarComponent {
  toolbarGroup:IToolbarItemOptions[]=SCALE_TOOLBAR_GROUP;
}
