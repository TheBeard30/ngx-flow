import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { getPositionStyle, IPosition } from '@/app/flow-core/interfaces';

@Component({
  selector: 'app-flow-node-panel',
  templateUrl: './flow-node-panel.component.html',
  styleUrls: ['./flow-node-panel.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlowNodePanelComponent implements OnInit {
  @Input() position: IPosition = { width: 240, top: 40, bottom: 0, left: 0 };

  style = {};

  CONTAINER_CLASS = 'xflow-node-panel-collpase';

  collapse = false;

  private width = 240;

  private left = 0;

  ngOnInit(): void {
    this.style = getPositionStyle(this.position);
  }

  setCollapse() {
    this.collapse = !this.collapse;
    this.collapse ? (this.position.left = -this.width) : (this.position.left = this.left);
    this.position = { ...this.position };
  }
}
