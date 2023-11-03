import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { getPositionStyle, IGraphConfig, IPosition } from '@/app/interfaces';
import { Application, GraphConfig } from '@/app/models';

@Component({
  selector: 'app-x-flow-canvas',
  templateUrl: './x-flow-canvas.component.html',
  styleUrls: ['./x-flow-canvas.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XFlowCanvasComponent implements OnChanges {
  @ViewChild('rootRef') rootRef: ElementRef | undefined;

  @ViewChild('canvasRef') canvasRef: ElementRef | undefined;

  @Input() isXFlowCanvas = true;

  @Input() config: GraphConfig;

  @Input() position?: IPosition;

  style = {};
  /** 暂时先传一下，后面改为service全局 */
  @Input() app: Application;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.app && changes.app.currentValue) {
      const config = this.config ? this.config : new GraphConfig();
      setTimeout(() => {
        config.setX6Config();
        config.setRootContainer(this.rootRef.nativeElement);
        config.setGraphContainer(this.rootRef.nativeElement);
        this.app.graphProvider.setGraphOptions(config as unknown as IGraphConfig);
      });
    }
    if (changes.position && changes.position.currentValue) {
      this.style = getPositionStyle(this.position);
      console.log(this.style);
    }
  }
}
