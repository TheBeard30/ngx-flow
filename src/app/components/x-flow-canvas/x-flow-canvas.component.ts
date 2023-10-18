import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { IPosition } from '@/app/interfaces';

@Component({
  selector: 'app-x-flow-canvas',
  templateUrl: './x-flow-canvas.component.html',
  styleUrls: ['./x-flow-canvas.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XFlowCanvasComponent {
  @ViewChild('rootRef') rootRef: ElementRef | undefined;

  @ViewChild('canvasRef') canvasRef: ElementRef | undefined;

  @Input() isXFlowCanvas = true;

  @Input() config: any;

  @Input() position?: IPosition;
}
