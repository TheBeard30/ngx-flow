import { Component } from '@angular/core';
import { TOOLBAR_GROUP } from './config/toolbar-config';
import { IToolbarItemOptions } from '@/app/flow-core/toolbar/interface';

@Component({
  selector: 'app-flow-canvas-toolbar',
  templateUrl: './flow-canvas-toolbar.component.html',
  styleUrls: ['./flow-canvas-toolbar.component.less']
})
export class FlowCanvasToolbarComponent {
  toolbarGroup:IToolbarItemOptions[]=TOOLBAR_GROUP
}
