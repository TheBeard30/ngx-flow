import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injector,
  Input,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { IPosition } from '@/app/flow-core/interfaces';
import { Application } from '@/app/flow-core/models';
import { useJsonFormModal } from '@/app/flow-extension/editor-panel/util';
import { defaultFormSchemaService } from '@/app/flow-extension/editor-panel/from-scheam.service';
import { defaultControlMap } from '@/app/flow-extension/editor-panel/components';
import * as MODELS from '@/app/flow-core/constants/model-constant';

@Component({
  selector: 'app-editor-panel',
  templateUrl: './editor-panel.component.html',
  styleUrls: ['./editor-panel.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorPanelComponent {
  @Input() position: IPosition = { width: 240, top: 0, bottom: 0, right: 0 };

  @ViewChild('configRef', { read: ViewContainerRef }) configRef: ViewContainerRef;

  CONTAINER_CLASS = 'xflow-editor-panel-collpase';

  collapse = false;

  private width = 240;

  private right = 0;

  controlMap = defaultControlMap(new Map<string, any>());

  getSelectNode = async () => {
    const node = await MODELS.SELECTED_NODE.useValue(this.app.modelService);
    return {
      ...node.position(),
      ...node.size(),
      ...node.data['ngArguments'].data
    };
  };

  getSelectEdge = async () => {
    const cell = await MODELS.SELECTED_CELL.useValue(this.app.modelService);
    console.log(cell);
    return {
      id: cell.id,
      ...cell.getData()
    };
  };

  changeSchema = ev => {
    setTimeout(() => {
      const { schema, targetCell } = ev;
      const name = schema.tabs[0].groups[0].controls[0].name;
      const widget = this.controlMap.get(name);
      const map = {
        'node-service': this.getSelectNode,
        'edge-service': this.getSelectEdge,
        'canvas-service': () => Promise.resolve(null)
      };
      map[name]().then(v => {
        console.log(v);
        this.configRef.clear();
        const componentRef = this.configRef.createComponent(widget, { injector: this.injector });
        // @ts-ignore
        componentRef.instance.config = v;
        this.cdr.markForCheck();
      });
    });
  };

  constructor(
    private app: Application,
    private injector: Injector,
    private cdr: ChangeDetectorRef
  ) {
    useJsonFormModal({
      app: this.app,
      formSchemaService: defaultFormSchemaService,
      targetType: ['node', 'edge', 'canvas', 'group'],
      callback: this.changeSchema
    });
  }

  setCollapse() {
    this.collapse = !this.collapse;
    this.collapse ? (this.position.right = -this.width) : (this.position.right = this.right);
    this.position = { ...this.position };
  }
}
