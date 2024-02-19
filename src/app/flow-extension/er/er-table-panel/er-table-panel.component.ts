import { IPosition } from '@/app/flow-core/interfaces';
import { GraphProviderService } from '@/app/flow-core/services';
import { AfterViewInit, Component, Input } from '@angular/core';
import { Graph } from '@antv/x6';
import { Dnd } from '@antv/x6-plugin-dnd';

@Component({
  selector: 'app-er-table-panel',
  templateUrl: './er-table-panel.component.html',
  styleUrls: ['./er-table-panel.component.less']
})
export class ErTablePanelComponent implements AfterViewInit {
  @Input() position: IPosition = { width: 240, top: 40, bottom: 0, left: 0 };
  @Input() table: any[];

  collapse = false;

  CONTAINER_CLASS = 'xflow-node-panel-collpase';


  private width = 240;

  private left = 0;
  //拖动插件
  dnd: Dnd;

  graph: Graph;

  constructor(private graphProvider: GraphProviderService) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.createDnd();
    });
  }
  async createDnd() {
    const graph = await this.graphProvider.getGraphInstance();
    this.graph = graph;
    this.dnd = new Dnd({
      target: graph
    });
  }

  startDrag(e: MouseEvent, item: any) {
    // 该 node 为拖拽的节点，默认也是放置到画布上的节点，可以自定义任何属性
    const node = this.graph.createNode({
      shape: 'er-node'
    })
    node.setData({
      ngArguments: {
        entity: item,
        id: node.id
      }
    });
    this.dnd.start(node, e)
    console.log(node.id)
  }

  setCollapse() {
    this.collapse = !this.collapse;
    this.collapse ? (this.position.left = -this.width) : (this.position.left = this.left);
    this.position = { ...this.position };
  }
}
