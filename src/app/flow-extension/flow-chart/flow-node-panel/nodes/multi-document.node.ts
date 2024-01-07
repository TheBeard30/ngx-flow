import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  DefaultNodeConfig,
  NODE_HEIGHT,
  NODE_PADDING,
  NODE_WIDTH
} from '@/app/flow-extension/flow-chart/flow-node-panel/constant';
import { createPath } from '@/app/flow-extension/flow-chart/flow-node-panel/utils';

@Component({
  selector: 'app-multi-document',
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" [attr.viewBox]="viewBox" width="100%" height="100%">
      <path [attr.d]="createCustomPath(false)" [attr.fill]="data.fill" [attr.stroke]="data.stroke" />
      <path [attr.d]="createCustomPath(true)" [attr.fill]="data.fill" [attr.stroke]="data.stroke" />
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
export class MultiDocumentNode implements OnChanges, OnInit {
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
    //绘制路径参数
    const multipleWidth = 6;
    const padding = NODE_PADDING;
    const multiPadding = multipleWidth / 2;
    let { width, height } = this.size;
    width += multipleWidth;
    height += multipleWidth;
    const bezierX = width / 8;
    const bezierY = height / 8;

    this.path = [
      ['M', padding + multiPadding, padding],
      ['L', width - 2 * padding, padding],
      ['L', width - 2 * padding, height - 2 * padding - bezierY],
      [
        'C',
        width - 2 * padding - bezierX,
        height - 2 * padding - 2 * bezierY,
        width / 2 + bezierX,
        height - 2 * padding - 2 * bezierY
      ],
      ['', width / 2, height - 2 * padding - bezierY],
      ['S', width / 4, height - 2 * padding, padding + multiPadding, height - 2 * padding - 2 * bezierY],
      ['L', padding + multiPadding, padding]
    ];
    this.viewBox = `0 0  ${width} ${height}`;
  }

  createCustomPath(bg: boolean) {
    if (bg) {
      return createPath(this.path, -3, 3);
    } else {
      return createPath(this.path);
    }
  }
}
