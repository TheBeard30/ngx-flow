import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IPosition } from '@/app/flow-core/interfaces';

@Component({
  selector: 'app-editor-panel',
  templateUrl: './editor-panel.component.html',
  styleUrls: ['./editor-panel.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorPanelComponent {
  @Input() position: IPosition = { width: 240, top: 0, bottom: 0, right: 0 };

  CONTAINER_CLASS = 'xflow-editor-panel-collpase';

  collapse = false;

  private width = 240;

  private right = 0;

  setCollapse() {
    this.collapse = !this.collapse;
    this.collapse ? (this.position.right = -this.width) : (this.position.right = this.right);
    this.position = { ...this.position };
  }
}
