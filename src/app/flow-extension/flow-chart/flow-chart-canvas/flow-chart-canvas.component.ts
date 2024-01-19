import { ChangeDetectionStrategy, Component, Inject, Injector, Input } from '@angular/core';
import { IPosition } from '@/app/flow-core/interfaces';
import { Application } from '@/app/flow-core/models';
import { useGraphConfig } from '@/app/flow-extension/flow-chart/flow-chart-canvas/config';
import { NSToolbarConfig } from '../flow-canvas-toolbar/config/toolbar-config';
@Component({
  selector: 'app-flow-chart-canvas',
  templateUrl: './flow-chart-canvas.component.html',
  styleUrls: ['./flow-chart-canvas.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlowChartCanvasComponent {
  @Input() position: IPosition = { top: 40, left: 240, right: 240, bottom: 0 };

  readonly isXFlowCanvas = true;

  config = useGraphConfig({});

  constructor(public app: Application, private injector: Injector) {
    NSToolbarConfig.initTollbar(injector);
  }
}
