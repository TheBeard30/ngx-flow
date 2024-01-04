import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IPosition } from '@/app/flow-core/interfaces';
import { Application } from '@/app/flow-core/models';
import { useJsonFormModal } from '@/app/flow-extension/editor-panel/util';
import { defaultFormSchemaService } from '@/app/flow-extension/editor-panel/from-scheam.service';

@Component({
  selector: 'app-editor-panel',
  templateUrl: './editor-panel.component.html',
  styleUrls: ['./editor-panel.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: []
})
export class EditorPanelComponent {
  @Input() position: IPosition = { width: 240, top: 0, bottom: 0, right: 0 };

  CONTAINER_CLASS = 'xflow-editor-panel-collpase';

  collapse = false;

  private width = 240;

  private right = 0;

  constructor(private app: Application) {
    useJsonFormModal({
      app: app,
      formSchemaService: defaultFormSchemaService
    });
  }

  setCollapse() {
    this.collapse = !this.collapse;
    this.collapse ? (this.position.right = -this.width) : (this.position.right = this.right);
    this.position = { ...this.position };
  }
}
