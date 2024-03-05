import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { getPositionStyle, IPosition, NsGraph } from '@/app/flow-core/interfaces';
import { getNodes } from '@/app/flow-extension/flow-chart/flow-node-panel/utils';
import { Dnd } from '@antv/x6-plugin-dnd';
import { CommandService, GraphProviderService } from '@/app/flow-core/services';
import { register } from '@antv/x6-angular-shape';
import { Graph, Node } from '@antv/x6';
import { DefaultNodeConfig } from '@/app/flow-extension/flow-chart/flow-node-panel/constant';
import ValidateNodeOptions = Dnd.ValidateNodeOptions;
import { uuidv4 } from '@/app/flow-core/models';
import { XFlowNodeCommands } from '@/app/flow-core/constants';
import Properties = Node.Properties;
import { FlowNodeComponent } from './flow-node.component';

@Component({
  selector: 'app-flow-node-panel',
  templateUrl: './flow-node-panel.component.html',
  styleUrls: ['./flow-node-panel.component.less'],
  changeDetection: ChangeDetectionStrategy.Default
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

  officialNodeList = [];

  dnd: Dnd;

  graph: Graph;

  searchValue: string;

  constructor(
    private graphProviderService: GraphProviderService,
    private commandService: CommandService,
  ) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.createDnd();
      this.initNode();
    });
  }

  async createDnd() {
    const graph = await this.graphProviderService.getGraphInstance();
    this.graph = graph;
    this.dnd = new Dnd({
      target: graph,
      scaled: false,
      dndContainer: this.dndContainer.nativeElement,
      validateNode: async (droppingNode: Node<Properties>, options: ValidateNodeOptions) => {
        const nodeConfig = {
          shape: droppingNode.shape,
          ...droppingNode.getSize(),
          ...droppingNode.getData<NsGraph.INodeConfig>(),
          ...droppingNode.getPosition()
        };
        const { ports } = droppingNode;
        const config = {
          ...nodeConfig,
          id: `node-${uuidv4()}`,
          zIndex: 10,
          ports: {
            ...ports,
            items: ports['items']?.map(item => ({
              ...item,
              id: uuidv4()
            }))
          }
        };
        const args = {
          nodeConfig: config
        };
        await this.commandService.executeCommand(XFlowNodeCommands.ADD_NODE.id, args);
        return false;
      }
    });
  }

  initNode() {
    // const className = config.nodeRender.get(GROUP_NODE_RENDER_ID);
    this.viewRef.clear()
    getNodes([]).then(async nodes => {
      const config = await this.graphProviderService.getGraphOptions();
      this.officialNodeList = nodes.filter(
        //查询节点
        i => this.searchValue === undefined || i.label?.includes(this.searchValue) || i.name?.includes(this.searchValue)
      ).map(n => {
        // 动态创建flow-node，然后给他传递input属性
        const componentRef = this.viewRef.createComponent(FlowNodeComponent);
        componentRef.setInput('data', n);
        componentRef.setInput('config', config);
        // @ts-ignore
        const element = componentRef.instance.elementRef.nativeElement;
        element.onmousedown = async (ev: MouseEvent) => {
          const node = this.graph.createNode({ shape: n.name, ports: n.ports, width: n.width, height: n.height });
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
              },
              size: {
                width: n.width,
                height: n.height
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

  ngOnInit(): void {
    this.style = getPositionStyle(this.position);
  }

  setCollapse() {
    this.collapse = !this.collapse;
    this.collapse ? (this.position.left = -this.width) : (this.position.left = this.left);
    this.position = { ...this.position };
  }

  search() {
    this.initNode()
  }
}
