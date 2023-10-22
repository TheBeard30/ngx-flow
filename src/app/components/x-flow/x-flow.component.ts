import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  QueryList,
  ViewChild
} from '@angular/core';
import { IGraphData, IGraphMeta } from '@/app/interfaces';
import { Application } from '@/app/models';
import { initApp } from '@/app/utils/app.util';

@Component({
  selector: 'app-x-flow',
  templateUrl: './x-flow.component.html',
  styleUrls: ['./x-flow.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XFlowComponent implements AfterViewInit {
  @ViewChild('XFlow') XFlow!: ElementRef;

  @ContentChildren('content') content!: QueryList<any>;

  @Input() meta!: IGraphMeta;

  @Input() graphConfig: any;

  @Input() graphData!: IGraphData;

  haveCanvasComponent = false;

  app: Application;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  ngAfterViewInit(): void {
    console.log(this.content);
    this.haveCanvasComponent = this.content.some(child => child && child.isXFlowCanvas);
    this.app = initApp(null, null, null);
  }
}
