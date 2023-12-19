import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injector,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { getPositionStyle, IPosition } from '@/app/flow-core/interfaces';
import { getNodes } from '@/app/flow-extension/flow-chart/flow-node-panel/utils';
import {
  TerminalNode,
  ProcessNode,
  DecisionNode,
  MultiDocumentNode,
  ConnectorNode,
  DataIONode,
  DatabaseNode,
  HardDiskNode,
  StroedDataNode,
  DocumentNode,
  PredefinedProcessNode,
  ExtractNode,
  MergeNode,
  OrNode,
  ManualInputNode,
  PreparationNode,
  DelayNode,
  ManualOperationNode,
  DisplayNode,
  OffPageLinkNode,
  NoteLeftNode,
  NoteRightNode,
  InternalStorageNode,
  TextNode
} from '@/app/flow-extension/flow-chart/flow-node-panel/nodes';
import { Dnd } from '@antv/x6-plugin-dnd';
import { GraphProviderService } from '@/app/flow-core/services';
import { register } from '@antv/x6-angular-shape';
import { Graph } from '@antv/x6';
import { DefaultNodeConfig } from '@/app/flow-extension/flow-chart/flow-node-panel/constant';

@Component({
  selector: 'app-flow-node-panel',
  templateUrl: './flow-node-panel.component.html',
  styleUrls: ['./flow-node-panel.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlowNodePanelComponent implements OnInit, AfterViewInit {
  @Input() position: IPosition = { width: 240, top: 40, bottom: 0, left: 0 };

  @ViewChild('templateRef', { read: ViewContainerRef }) viewRef: ViewContainerRef;

  @ViewChild('dndContainer') dndContainer: ElementRef;

  style = {};

  CONTAINER_CLASS = 'xflow-node-panel-collpase';

  collapse = false;

  private width = 240;

  private left = 0;

  // TODO 先暂时写一个数组
  officialNodeList = [];

  dnd: Dnd;

  graph: Graph;

  constructor(
    private graphProviderService: GraphProviderService,
    private injector: Injector
  ) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.createDnd();
    });
  }

  async createDnd() {
    const graph = await this.graphProviderService.getGraphInstance();
    this.graph = graph;
    this.dnd = new Dnd({
      target: graph,
      scaled: true,
      dndContainer: this.dndContainer.nativeElement
    });
  }

  ngOnInit(): void {
    this.style = getPositionStyle(this.position);
    const componentMap = {
      Terminal: TerminalNode,
      Process: ProcessNode,
      Decision: DecisionNode,
      MultiDocument: MultiDocumentNode,
      Connector: ConnectorNode,
      DataIO: DataIONode,
      Database: DatabaseNode,
      HardDisk: HardDiskNode,
      StroedData: StroedDataNode,
      Document: DocumentNode,
      PredefinedProcess: PredefinedProcessNode,
      Extract: ExtractNode,
      Merge: MergeNode,
      Or: OrNode,
      ManualInput: ManualInputNode,
      Preparation: PreparationNode,
      Delay: DelayNode,
      ManualOperation: ManualOperationNode,
      Display: DisplayNode,
      OffPageLink: OffPageLinkNode,
      NoteLeft: NoteLeftNode,
      NoteRight: NoteRightNode,
      InternalStorage: InternalStorageNode,
      Text: TextNode
    };
    getNodes([]).then(nodes => {
      this.officialNodeList = nodes.map(n => {
        const className = componentMap[n.name];
        register({
          shape: n.name,
          width: n.width || 180,
          height: n.height || 40,
          content: className,
          injector: this.injector
        });
        const componentRef = this.viewRef.createComponent<any>(className);
        componentRef.instance.data.label = n.label;
        // @ts-ignore
        const element = componentRef.instance.elementRef.nativeElement;
        element.onmousedown = (ev: MouseEvent) => {
          const node = this.graph.createNode({ shape: n.name , ports: n.ports});
          const options = {} as any;
          if (n.label) {
            options.label = n.label;
            options.fill = 'transparent';
          }
          node.setData({
            ngArguments: {
              data: {
                stroke: DefaultNodeConfig.stroke,
                label: DefaultNodeConfig.label,
                fill: DefaultNodeConfig.fill,
                fontFill: DefaultNodeConfig.fontFill,
                fontSize: DefaultNodeConfig.fontSize,
                ...options
              }
            }
          });
          node.getData().ngArguments.data.label = n.label;
          this.dnd.start(node, ev);
        };
        return {
          ...n,
          instance: componentRef.instance
        };
      });
    });
  }

  setCollapse() {
    this.collapse = !this.collapse;
    this.collapse ? (this.position.left = -this.width) : (this.position.left = this.left);
    this.position = { ...this.position };
  }
}