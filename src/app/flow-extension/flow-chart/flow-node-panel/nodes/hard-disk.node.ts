import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  DefaultNodeConfig,
  NODE_HEIGHT,
  NODE_PADDING,
  NODE_WIDTH
} from '@/app/flow-extension/flow-chart/flow-node-panel/constant';
import { createPath } from '@/app/flow-extension/flow-chart/flow-node-panel/utils';

@Component({
  selector: 'app-hard-disk',
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" [attr.viewBox]="viewBox" width="100%" height="100%">
      <path [attr.d]="createCustomPath(true)" [attr.fill]="data.fill" [attr.stroke]="data.stroke" />
      <path [attr.d]="createCustomPath(false)" [attr.fill]="data.fill" [attr.stroke]="data.stroke" />
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
export class HardDiskNode implements OnChanges, OnInit {
  @Input() size = { width: NODE_WIDTH, height: NODE_HEIGHT };

  @Input() data = {
    stroke: DefaultNodeConfig.stroke,
    label: DefaultNodeConfig.label,
    fill: DefaultNodeConfig.fill,
    fontFill: DefaultNodeConfig.fontFill,
    fontSize: DefaultNodeConfig.fontSize
  };

  rx: number;

  path1: (string | number)[][];
  path2: (string | number)[][];

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

    const bezierX = Math.min(this.size.width / 10, this.size.height / 4);
    const bezierY = Math.min(this.size.height / 4, this.size.width / 4);
    this.path1 = [
      ['M', NODE_PADDING + bezierX, NODE_PADDING],
      ['L', this.size.width - 2 * NODE_PADDING - bezierX, NODE_PADDING],
      [
        'C',
        this.size.width - 2 * NODE_PADDING,
        NODE_PADDING + bezierY,
        this.size.width - 2 * NODE_PADDING,
        this.size.height - 2 * NODE_PADDING - bezierY
      ],
      ['', this.size.width - 2 * NODE_PADDING - bezierX, this.size.height - 2 * NODE_PADDING],
      ['L', NODE_PADDING + bezierX, this.size.height - 2 * NODE_PADDING],
      ['C', NODE_PADDING, this.size.height - 2 * NODE_PADDING - bezierY, NODE_PADDING, NODE_PADDING + bezierY],
      ['', NODE_PADDING + bezierX, NODE_PADDING] // top-left
    ];
    this.path2 = [
      ['M', this.size.width - 2 * NODE_PADDING - bezierX, NODE_PADDING],
      [
        'C',
        this.size.width - 2 * NODE_PADDING - 2 * bezierX,
        NODE_PADDING + bezierY,
        this.size.width - 2 * NODE_PADDING - 2 * bezierX,
        this.size.height - 2 * NODE_PADDING - bezierY
      ],
      ['', this.size.width - 2 * NODE_PADDING - bezierX, this.size.height - 2 * NODE_PADDING] // bottom-right
    ];
    this.viewBox = `0 0  ${this.size.width} ${this.size.height}`;
  }

  createCustomPath(bg: boolean) {
    if (bg) {
      return createPath(this.path1);
    } else {
      return createPath(this.path2);
    }
  }
}
