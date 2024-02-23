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
import { XFlowEdgeCommands, XFlowNodeCommands } from '@/app/flow-core/constants';

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
    if (!node) return {};
    return {
      id: node.id,
      ...node.data['ngArguments'].data,
      ...node.position(),
      ...node.size()
    };
  };

  updateNode = async (record: Record<string, any>) => {
    const currentNodeData = await this.getSelectNode();
    const data = {
      ...currentNodeData,
      ...record
    };
    const nodeConfig = {
      ngArguments: {
        data: data,
        size: {
          width: data.width,
          height: data.height
        }
      },
      ...currentNodeData,
      ...record
    };
    await this.app.commandService.executeCommand(XFlowNodeCommands.UPDATE_NODE.id, {
      nodeConfig
    });
  };

  getSelectEdge = async () => {
    const cell = await MODELS.SELECTED_CELL.useValue(this.app.modelService);
    console.log('edge>>>', cell);
    return {
      id: cell.id,
      ...cell.getData(),
      attrs: cell.getAttrs()
    };
  };

  updateEdge = async (value: Record<string, any>, type: 'text' | 'line' = 'line', key?: string) => {
    const config = await this.getSelectEdge();
    const edgeConfig = {
      ...config,
      ...(key ? value[key] : value),
      attrs: {
        ...config.attrs,
        [type]: {
          ...config.attrs?.[type],
          ...(key ? value[key] : value)
        }
      }
    };
    await this.app.commandService.executeCommand(XFlowEdgeCommands.UPDATE_EDGE.id, { edgeConfig });
  };
  getSelectTable = async () => {
    const node = await MODELS.SELECTED_NODE.useValue(this.app.modelService);
    if (!node) return {};
    return {
      id: node.id,
      ...node.getData().ngArguments
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
        'er-service': this.getSelectTable,
        'group-service': this.getSelectNode,
        'canvas-service': () => Promise.resolve(null)
      };
      map[name]().then(v => {
        console.log('v', v);
        this.configRef.clear();
        const componentRef = this.configRef.createComponent(widget, { injector: this.injector });
        // @ts-ignore
        componentRef.instance.config = v;
        // @ts-ignore
        componentRef.instance.plugin = {
          updateNode: this.updateNode,
          updateEdge: this.updateEdge
        };
        this.cdr.markForCheck();
      });
    }, 1);
  };

  constructor(
    private app: Application,
    private injector: Injector,
    private cdr: ChangeDetectorRef
  ) {
    useJsonFormModal({
      app: this.app,
      formSchemaService: defaultFormSchemaService,
      targetType: ['node', 'edge', 'canvas', 'group', 'er'],
      callback: this.changeSchema
    });
  }

  setCollapse() {
    this.collapse = !this.collapse;
    this.collapse ? (this.position.right = -this.width) : (this.position.right = this.right);
    this.position = { ...this.position };
  }
}
