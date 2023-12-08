import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  DefaultNodeConfig,
  NODE_HEIGHT,
  NODE_PADDING,
  NODE_WIDTH
} from '@/app/flow-extension/flow-chart/flow-node-panel/constant';
import { createPath } from '@/app/flow-extension/flow-chart/flow-node-panel/utils';

@Component({
  selector: 'app-manual-input',
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" [attr.viewBox]="viewBox" width="100%" height="100%">
      <path [attr.d]="createCustomPath()" [attr.fill]="data.fill" [attr.stroke]="data.stroke" />
      <text>
        {{ data.label }}
      </text>
      Sorry, your browser does not support inline SVG.
    </svg>
  `
})
export class ManualInputNode implements OnChanges, OnInit {
  @Input() size = { width: NODE_WIDTH, height: NODE_HEIGHT };

  @Input() data = {
    stroke: DefaultNodeConfig.stroke,
    label: DefaultNodeConfig.label,
    fill: DefaultNodeConfig.fill,
    fontFill: DefaultNodeConfig.fontFill,
    fontSize: DefaultNodeConfig.fontSize
  };

  rx: number;

  path: (string | number)[][];

  viewBox: string;

  constructor(private elementRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && changes.data.currentValue) {
      this.create();
    }
    if (changes.size && changes.size.currentValue) {
      this.create();
    }
  }

  ngOnInit(): void {
    this.create();
  }

  create() {
    this.rx = Math.min(this.size.height, this.size.width) / 2;

    this.path = [
        ['M', NODE_PADDING, this.size.height / 5],
        ['L', this.size.width - 2 * NODE_PADDING, NODE_PADDING],
        ['L', this.size.width - 2 * NODE_PADDING, this.size.height - 2 * NODE_PADDING],
        ['L', NODE_PADDING, this.size.height - 2 * NODE_PADDING],
        ['Z'],
    ];
    this.viewBox = `0 0  ${this.size.width} ${this.size.height}`;
  }

  createCustomPath() {
    return createPath(this.path);
  }
}
