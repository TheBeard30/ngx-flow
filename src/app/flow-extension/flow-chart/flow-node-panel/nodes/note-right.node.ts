import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  DefaultNodeConfig,
  NODE_HEIGHT,
  NODE_PADDING,
  NODE_WIDTH
} from '@/app/flow-extension/flow-chart/flow-node-panel/constant';
import { createPath } from '@/app/flow-extension/flow-chart/flow-node-panel/utils';

@Component({
  selector: 'app-note-right',
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" [attr.viewBox]="viewBox" width="100%" height="100%">
      <path [attr.d]="createCustomPath()" [attr.fill]="data.fill" [attr.stroke]="data.stroke" />
      <text
        [attr.x]="size.width / 2"
        [attr.y]="size.height / 2"
        [attr.fill]="data.fontFill"
        text-anchor="middle"
        alignment-baseline="middle"
        [attr.font-size]="data.fontSize"
      >
        {{ data.label }}
      </text>
      Sorry, your browser does not support inline SVG.
    </svg>
  `
})
export class NoteRightNode implements OnChanges, OnInit {
  @Input() size = { width: NODE_WIDTH, height: NODE_HEIGHT };

  @Input() data = {
    stroke: DefaultNodeConfig.stroke,
    label: DefaultNodeConfig.label,
    fill: 'transparent',
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
    const dx = 6;
    this.path = [
      ['M', NODE_PADDING, NODE_PADDING],
      ['C', dx, NODE_PADDING, dx, dx],
      ['', dx, (this.size.height - dx) / 2],
      ['L', 2 * dx, this.size.height / 2],
      ['L', dx, (this.size.height + dx) / 2],
      ['L', dx, this.size.height - 2 * NODE_PADDING - dx],
      ['C', dx, this.size.height - 2 * NODE_PADDING, NODE_PADDING, this.size.height - 2 * NODE_PADDING],
      ['', NODE_PADDING, this.size.height - 2 * NODE_PADDING]
    ];
    this.viewBox = `0 0  ${this.size.width} ${this.size.height}`;
  }

  createCustomPath() {
    return createPath(this.path);
  }
}
