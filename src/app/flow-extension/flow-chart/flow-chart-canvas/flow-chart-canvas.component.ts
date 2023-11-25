import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { IPosition } from '@/app/flow-core/interfaces';
import { Application } from '@/app/flow-core/models';

@Component({
  selector: 'app-flow-chart-canvas',
  templateUrl: './flow-chart-canvas.component.html',
  styleUrls: ['./flow-chart-canvas.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlowChartCanvasComponent {
  @Input() position: IPosition = { top: 40, left: 240, right: 240, bottom: 0 };

  @Inject(Application) app: Application;

  readonly isXFlowCanvas = true;
}
