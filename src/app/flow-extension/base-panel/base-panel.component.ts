import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
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

  @Input() collapse: boolean

  @ViewChild('container') container: ElementRef;

  containerStyle: { [p: string]: any } = {};

  containerClass: { [p: string]: any } = {
    'xflow-workspace-panel': true
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.position && changes.position.currentValue) {
      this.setContainerStyle();
    }
    if (changes.collapse && this.container !== undefined) {
      this.setContainerStyle();
    }
  }
  setClass() {
    console.log(this.container.nativeElement.style);
    this.container.nativeElement.style.position = 'absolute';

  }

  ngOnInit(): void {
    this.setContainerStyle();
  }

  setContainerStyle() {
    const positionStyle = getPositionStyle(this.position);
    if (!this.collapse) {
      positionStyle.position = 'relative';
    } else {
      positionStyle.position = 'absolute'
    }
    this.containerStyle = {
      ...positionStyle,
      ...this.style
    };
    if (this.className) {
      this.containerClass[this.className] = true;
    }
  }
}
