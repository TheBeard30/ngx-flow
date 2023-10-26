import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IGraphConfig, IPosition } from '@/app/interfaces';
import { Application, GraphConfig } from '@/app/models';

@Component({
  selector: 'app-x-flow-canvas',
  templateUrl: './x-flow-canvas.component.html',
  styleUrls: ['./x-flow-canvas.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XFlowCanvasComponent implements AfterViewInit {
  @ViewChild('rootRef') rootRef: ElementRef | undefined;

  @ViewChild('canvasRef') canvasRef: ElementRef | undefined;

  @Input() isXFlowCanvas = true;

  @Input() config: GraphConfig;

  @Input() position?: IPosition;
  /** 暂时先传一下，后面改为service全局 */
  @Input() app: Application;

  ngAfterViewInit(): void {
    const config = this.config ? this.config : new GraphConfig();
    config.setX6Config();
    config.setRootContainer(this.rootRef.nativeElement);
    config.setGraphContainer(this.rootRef.nativeElement);
    this.app.graphProvider.setGraphOptions(config as unknown as IGraphConfig);
    // TODO 设置Graph实例
  }
}
