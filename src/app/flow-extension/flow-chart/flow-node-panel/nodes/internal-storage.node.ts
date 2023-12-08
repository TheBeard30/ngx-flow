import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  DefaultNodeConfig,
  NODE_HEIGHT,
  NODE_PADDING,
  NODE_WIDTH
} from '@/app/flow-extension/flow-chart/flow-node-panel/constant';
import { createPath } from '@/app/flow-extension/flow-chart/flow-node-panel/utils';

@Component({
  selector: 'app-internal-storage',
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
export class InternalStorageNode implements OnChanges, OnInit {
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
  path1:string;
  path2:string;

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
    const availableWidth = this.size.width - 2 * NODE_PADDING;
    const availableHieght = this.size.height - 2 * NODE_PADDING;
    const rx = 6;
    this.path = [
        ['M', NODE_PADDING, NODE_PADDING],
        ['L', availableWidth - rx, NODE_PADDING],
        ['C', availableWidth, NODE_PADDING, availableWidth, rx],
        ['', availableWidth, this.size.height / 2],
        ['L', availableWidth, availableHieght - rx],
        ['C', availableWidth, availableHieght, availableWidth - rx, availableHieght],
        ['', availableWidth - rx, availableHieght],
        ['L', rx, availableHieght],
        ['C', NODE_PADDING, availableHieght, NODE_PADDING, availableHieght - rx],
        ['', NODE_PADDING, availableHieght - rx],
        ['Z'],
    ];
    this.path1=`M ${NODE_PADDING},${rx} L ${availableWidth - 1} ${rx}`;
    this.path2=`M ${rx},${NODE_PADDING} L ${rx} ${availableHieght} `;
    this.viewBox = `0 0  ${this.size.width} ${this.size.height}`;
  }

  createCustomPath(index:number) {
    switch(index){
        case 1:
            return createPath(this.path);
        case 2:
            return this.path1;
        default:
            return this.path2;
    }
    
  }
}
