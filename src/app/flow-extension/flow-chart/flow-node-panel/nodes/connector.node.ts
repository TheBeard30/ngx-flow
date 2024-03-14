import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  DefaultNodeConfig,
  NODE_HEIGHT,
  NODE_PADDING,
  NODE_WIDTH
} from '@/app/flow-extension/flow-chart/flow-node-panel/constant';

@Component({
  selector: 'app-connector',
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" [attr.viewBox]="viewBox" width="100%" height="100%">
      <path [attr.d]="createCustomPath()" [attr.fill]="data.fill" [attr.stroke]="data.stroke" />
      <text
        [attr.x]="size.width / 2"
        [attr.y]="size.height / 2"
        [attr.fill]="data.fontFill"
        [attr.font-size]="data.fontSize"
        text-anchor="middle"
        alignment-baseline="middle"
      >
        {{ data.label }}
      </text>
      Sorry, your browser does not support inline SVG.
    </svg>
  `
})
export class ConnectorNode implements OnChanges, OnInit {
  @Input() size = { width: NODE_WIDTH, height: NODE_HEIGHT };

  @Input() data = {
    stroke: DefaultNodeConfig.stroke,
    label: DefaultNodeConfig.label,
    fill: DefaultNodeConfig.fill,
    fontFill: DefaultNodeConfig.fontFill,
    fontSize: DefaultNodeConfig.fontSize
  };

  rx: number;

  path: string;

  viewBox: string;

  constructor(private elementRef: ElementRef) { }

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
    this.path = `M ${NODE_PADDING},${this.size.height / 2} a ${(this.size.height - 2 * NODE_PADDING) / 2} ${(this.size.height - 2 * NODE_PADDING) / 2
      } 0 1 1 0 1 z`;
    this.viewBox = `0 0  ${this.size.width} ${this.size.height}`;
  }

  createCustomPath() {
    return this.path;
  }
}
