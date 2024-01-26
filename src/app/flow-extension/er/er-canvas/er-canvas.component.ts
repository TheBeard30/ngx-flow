import { IPosition } from '@/app/flow-core/interfaces';
import { Application } from '@/app/flow-core/models';
import { KeybindingConfig } from '@/app/flow-core/models/keybinding-config.model';
import { Component, Injector, Input } from '@angular/core';
import { useGraphConfig, useKeybindingConfig } from '../../flow-chart/flow-chart-canvas/config';
import { register } from '@antv/x6-angular-shape';
import { ErNodeComponent } from '../er-node/er-node.component';

@Component({
  selector: 'app-er-canvas',
  templateUrl: './er-canvas.component.html',
  styleUrls: ['./er-canvas.component.less']
})
export class ErCanvasComponent {
  @Input() position: IPosition = { top: 40, left: 240, right: 240, bottom: 0 };

  readonly isXFlowCanvas = true;

  //暂时使用流程图的config
  config = useGraphConfig({});
  keybindingConfig = useKeybindingConfig(new KeybindingConfig());

  constructor(public app: Application, private injector: Injector,) {
    register({
      shape: 'er-node',
      width: 170,
      height: 200,
      content: ErNodeComponent,
      injector: injector
    });
  }
}
