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
import { Dnd } from '@antv/x6-plugin-dnd';
import { GraphProviderService } from '@/app/flow-core/services';
import { register, AngularShape } from '@antv/x6-angular-shape';
import { Graph } from '@antv/x6';
import { DefaultNodeConfig } from '@/app/flow-extension/flow-chart/flow-node-panel/constant';

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
      this.initNode();
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

  initNode() {
    getNodes([]).then(async nodes => {
      const config = await this.graphProviderService.getGraphOptions();
      this.officialNodeList = nodes.map(n => {
        const className = config.nodeRender.get(n.name);
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
}
