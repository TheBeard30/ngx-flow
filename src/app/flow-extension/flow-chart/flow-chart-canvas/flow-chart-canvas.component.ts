import { ChangeDetectionStrategy, Component, Inject, Injector, Input } from '@angular/core';
import { IPosition } from '@/app/flow-core/interfaces';
import { Application } from '@/app/flow-core/models';
import { useGraphConfig, useKeybindingConfig } from '@/app/flow-extension/flow-chart/flow-chart-canvas/config';
import { NSToolbarConfig } from '../flow-canvas-toolbar/config/toolbar-config';
import { KeybindingConfig } from '@/app/flow-core/models/keybinding-config.model';
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

  keybindingConfig = useKeybindingConfig(new KeybindingConfig());

  constructor(
    public app: Application,
    private injector: Injector
  ) {
    NSToolbarConfig.initToolbar(injector);
  }
}
