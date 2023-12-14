import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IPosition } from '@/app/flow-core/interfaces';
import { Application, GraphConfig } from '@/app/flow-core/models';

@Component({
  selector: 'app-flow-chart-canvas',
  templateUrl: './flow-chart-canvas.component.html',
  styleUrls: ['./flow-chart-canvas.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlowChartCanvasComponent {
  @Input() position: IPosition = { top: 40, left: 240, right: 240, bottom: 0 };

  readonly isXFlowCanvas = true;

  config = new GraphConfig();

  constructor(public app: Application) {}
}
