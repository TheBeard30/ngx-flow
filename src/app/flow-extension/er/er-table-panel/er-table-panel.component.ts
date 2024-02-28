import { IPosition } from '@/app/flow-core/interfaces';
import { CommandService, GraphProviderService } from '@/app/flow-core/services';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Graph, Node } from '@antv/x6';
import { Dnd } from '@antv/x6-plugin-dnd';
import ValidateNodeOptions = Dnd.ValidateNodeOptions;
import Properties = Node.Properties;
import { getNodePorts, registerPortLayout } from '../utils';

@Component({
  selector: 'app-er-table-panel',
  templateUrl: './er-table-panel.component.html',
  styleUrls: ['./er-table-panel.component.less']
})
export class ErTablePanelComponent implements OnInit, AfterViewInit {
  @Input() position: IPosition = { width: 240, top: 40, bottom: 0, left: 0 };
  @Input() table: any[];

  collapse = false;

  CONTAINER_CLASS = 'xflow-node-panel-collpase';


  private width = 240;

  private left = 0;
  //拖动插件
  dnd: Dnd;

  graph: Graph;



  constructor(private graphProvider: GraphProviderService, private commandService: CommandService) { }

  ngOnInit(): void {
    registerPortLayout()
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.createDnd();
    });
  }
  async createDnd() {
    const graph = await this.graphProvider.getGraphInstance();
    this.graph = graph;
    this.dnd = new Dnd({
      target: graph,
      getDragNode: (node) => node.clone({ keepId: true }),
      getDropNode: (node) => node.clone({ keepId: true }),
      validateNode: async (droppingNode: Node<Properties>, options: ValidateNodeOptions) => {
        const droppingNodeKey = droppingNode.getData().ngArguments.entity.entityName;
        //判断表节点是否已经存在
        for (const n of graph.getNodes()) {
          if (n.getData().ngArguments.entity.entityName === droppingNodeKey) {
            return false;
          }
        }
        return true;

      }
    });
  }

  startDrag(e: MouseEvent, item: any) {
    console.log('item', item)
    // 该 node 为拖拽的节点，默认也是放置到画布上的节点，可以自定义任何属性
    const node = this.graph.createNode({
      shape: 'er-node',
      ports: getNodePorts(item.entityProperties.slice(0, 5))
    })
    node.setData({
      ngArguments: {
        entity: item,
        id: node.id,
      }
    });
    this.dnd.start(node, e)
  }


  setCollapse() {
    this.collapse = !this.collapse;
    this.collapse ? (this.position.left = -this.width) : (this.position.left = this.left);
    this.position = { ...this.position };
  }
}
