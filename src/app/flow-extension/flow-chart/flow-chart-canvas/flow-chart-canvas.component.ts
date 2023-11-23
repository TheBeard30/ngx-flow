import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-flow-chart-canvas',
  templateUrl: './flow-chart-canvas.component.html',
  styleUrls: ['./flow-chart-canvas.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlowChartCanvasComponent {}
