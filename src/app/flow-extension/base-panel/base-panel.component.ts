import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { getPositionStyle, IPosition } from '@/app/flow-core/interfaces';

@Component({
  selector: 'app-base-panel',
  templateUrl: './base-panel.component.html',
  styleUrls: ['./base-panel.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class BasePanelComponent implements OnInit, OnChanges {
  @Input() position: IPosition;

  @Input() style: { [p: string]: any } = {};

  @Input() className: string;

  containerStyle: { [p: string]: any } = {};

  containerClass: { [p: string]: any } = {
    'xflow-workspace-panel': true
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.position && changes.position.currentValue) {
      this.setContainerStyle();
    }
  }

  ngOnInit(): void {
    this.setContainerStyle();
  }

  setContainerStyle() {
    const positionStyle = getPositionStyle(this.position);
    this.containerStyle = {
      ...positionStyle,
      ...this.style
    };
    if (this.className) {
      this.containerClass[this.className] = true;
    }
  }
}
