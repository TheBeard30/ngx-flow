import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-x-flow-canvas',
  templateUrl: './x-flow-canvas.component.html',
  styleUrls: ['./x-flow-canvas.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XFlowCanvasComponent {
  @ViewChild('rootRef') rootRef: ElementRef | undefined;

  @ViewChild('canvasRef') canvasRef: ElementRef | undefined;
}
