import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  DefaultNodeConfig,
  NODE_HEIGHT,
  NODE_PADDING,
  NODE_WIDTH
} from '@/app/flow-extension/flow-chart/flow-node-panel/constant';
import { createPath } from '@/app/flow-extension/flow-chart/flow-node-panel/utils';

@Component({
  selector: 'app-predefined-process',
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" [attr.viewBox]="viewBox" width="100%" height="100%">
      <path [attr.d]="createCustomPath(1)" [attr.fill]="data.fill" [attr.stroke]="data.stroke" />
      <path [attr.d]="createCustomPath(2)" [attr.fill]="data.fill" [attr.stroke]="data.stroke" />
      <path [attr.d]="createCustomPath(3)" [attr.fill]="data.fill" [attr.stroke]="data.stroke" />
      <text>
        {{ data.label }}
      </text>
      Sorry, your browser does not support inline SVG.
    </svg>
  `
})
export class PredefinedProcessNode implements OnChanges, OnInit {
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
  path3: (string | number)[][];

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

    const struckOffset = this.size.width / 8;
    this.path1 = [
        ['M', NODE_PADDING, NODE_PADDING],
        ['L', this.size.width - 2 * NODE_PADDING, NODE_PADDING],
        ['L', this.size.width - 2 * NODE_PADDING, this.size.height - 2 * NODE_PADDING],
        ['L', NODE_PADDING, this.size.height - 2 * NODE_PADDING],
        ['Z'],
    ];
    this.path2=[
        ['M', struckOffset, NODE_PADDING],
        ['L', struckOffset, this.size.height - 2 * NODE_PADDING],
    ];
    this.path3=[
        ['M', this.size.width - struckOffset, NODE_PADDING],
        ['L', this.size.width - struckOffset, this.size.height - 2 * NODE_PADDING],
    ];
    this.viewBox = `0 0  ${this.size.width} ${this.size.height}`;
  }

  createCustomPath(index:number) {
    switch (index){
        case 1:
            return createPath(this.path1);
        case 2:
            return createPath(this.path2);
        default:
            return createPath(this.path3);
    }
   
  }
}
