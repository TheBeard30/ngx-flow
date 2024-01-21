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
import { getPositionStyle, IGraphConfig, IPosition } from '@/app/flow-core/interfaces';
import { Application, GraphConfig } from '@/app/flow-core/models';
import { KeybindingConfig } from '@/app/flow-core/models/keybinding-config.model';
import { KeybindingService } from '@/app/flow-core/services';

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

  @Input() graphConfig: GraphConfig;

  @Input() keybindingConfig: KeybindingConfig;

  @Input() position?: IPosition;

  style = {};
  /** 暂时先传一下，后面改为service全局 */
  @Input() app: Application;

  constructor(private keybindingService: KeybindingService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.app && changes.app.currentValue) {
      let config;
      if (this.graphConfig) {
        config = this.graphConfig;
      } else {
        config = new GraphConfig();
        config.setX6Config();
      }
      if (this.keybindingConfig) {
        this.keybindingService.setKeybindingConfig(this.keybindingConfig);
      }
      setTimeout(() => {
        config.setRootContainer(this.rootRef.nativeElement);
        config.setGraphContainer(this.canvasRef.nativeElement);
        this.app.graphProvider.setGraphOptions(config as unknown as IGraphConfig);
      });
    }
    if (changes.position && changes.position.currentValue) {
      this.style = getPositionStyle(this.position);
      console.log(this.style);
    }
  }
}
