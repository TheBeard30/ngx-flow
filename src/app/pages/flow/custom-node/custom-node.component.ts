import { NODE_WIDTH, NODE_HEIGHT, DefaultNodeConfig } from '@/app/flow-extension/flow-chart/flow-node-panel/constant';
import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-custom-node',
  template: `
  <div class="text-center w-[100%] h-[100%] border border-black">
    <span>{{data.label}}</span>
  </div>
  `,
  styles: ['']
})
export class CustomNodeComponent {

  @Input() size = { width: NODE_WIDTH, height: NODE_HEIGHT };

  @Input() data = {
    stroke: DefaultNodeConfig.stroke,
    label: DefaultNodeConfig.label,
    fill: DefaultNodeConfig.fill,
    fontFill: DefaultNodeConfig.fontFill,
    fontSize: DefaultNodeConfig.fontSize
  };

  constructor(private elementRef: ElementRef) { }

}
