import { XFlowGroupCommands } from '@/app/flow-core/constants';
import { CommandService } from '@/app/flow-core/services';
import { Component, Input, OnInit } from '@angular/core';
import { DefaultNodeConfig, NODE_HEIGHT, NODE_WIDTH } from '../constant';

@Component({
  selector: 'app-group.node',
  template: `
    <div class="xflow-group-node">
      <div class="xflow-group-header">
        <div class="header-left">{{this.data.label}}</div>
        <div class="header-right">
          <button *ngIf="!this.data.isCollapsed" (click)="onExpand()"><span nz-icon nzType="plus-square" nzTheme="outline"></span></button>
          <button *ngIf="this.data.isCollapsed" (click)="onCollapse()"><span nz-icon nzType="minus-square" nzTheme="outline"></span></button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./group.node.component.less']
})
export class GroupNodeComponent implements OnInit {
  @Input() size: any;
  @Input() data: any;
  style = {
    stroke: DefaultNodeConfig.stroke,
    label: DefaultNodeConfig.label,
    fill: DefaultNodeConfig.fill,
    fontFill: DefaultNodeConfig.fontFill,
    fontSize: DefaultNodeConfig.fontSize,
  }
  constructor(private commandService: CommandService) { }
  ngOnInit(): void {
    this.data.isCollapsed = true;
  }


  onExpand() {
    this.commandService.executeCommand(XFlowGroupCommands.COLLAPSE_GROUP.id, {
      nodeId: this.data.id,
      isCollapsed: false,
      collapsedSize: { width: 200, height: 40 },
    })
    this.data.isCollapsed = true
  }
  onCollapse() {
    this.commandService.executeCommand(XFlowGroupCommands.COLLAPSE_GROUP.id, {
      nodeId: this.data.id,
      isCollapsed: true,
      collapsedSize: { width: this.size.width, height: 40 },
      gap: 3,
    })
    this.data.isCollapsed = false
  }
}
