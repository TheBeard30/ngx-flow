import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { getPositionStyle, IPosition } from '@/app/flow-core/interfaces';

@Component({
  selector: 'app-base-panel',
  templateUrl: './base-panel.component.html',
  styleUrls: ['./base-panel.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasePanelComponent implements OnInit {
  @Input() position: IPosition;

  @Input() style: { [p: string]: any } = {};

  @Input() className: string;

  containerStyle: { [p: string]: any } = {};

  containerClass: { [p: string]: any } = {
    'xflow-workspace-panel': true
  };

  ngOnInit(): void {
    const positionStyle = getPositionStyle(this.position);
    this.containerStyle = {
      ...positionStyle,
      ...this.style
    };
  }
}
