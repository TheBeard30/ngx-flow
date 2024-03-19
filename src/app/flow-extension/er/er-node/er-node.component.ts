import { XFlowNodeCommands } from '@/app/flow-core/constants';
import { CommandService, GraphProviderService } from '@/app/flow-core/services';
import { AfterViewInit, Component, Input } from '@angular/core';
import { getNodePorts } from '../utils';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Edge, Graph } from '@antv/x6';

@Component({
  selector: 'app-er-node',
  templateUrl: './er-node.component.html',
  styleUrls: ['./er-node.component.less']
})
export class ErNodeComponent implements AfterViewInit {
  @Input() entity: any;
  @Input() id: string;

  graph: Graph;
  //是否展示所有字段
  expand = false;
  //隐藏掉的连线
  hiddenEdges = [];
  //字段拖动连线暂存
  dragEdges: Edge[] = [];


  constructor(private graphProvider: GraphProviderService, private commandService: CommandService) { }
  ngAfterViewInit(): void {
    this.graphProvider.getGraphInstance().then(g => { this.graph = g; });
  }

  getCls() {

    if (this.entity?.entityType === 'FACT') {
      return 'fact'
    }
    if (this.entity?.entityType === 'DIM') {
      return 'dim'
    }
    if (this.entity?.entityType === 'OTHER') {
      return 'other'
    }
    return ''
  }
  delNode() {
    this.commandService.executeCommand(XFlowNodeCommands.DEL_NODE.id, {
      nodeConfig: {
        id: this.id
      }
    });
  }

  //展开所有字段
  expandField() {
    this.graphProvider.getGraphInstance().then(g => {
      const self = g.getCellById(this.id);
      //获取当前节点连线
      const edges = g.getConnectedEdges(self);
      //将隐藏的连线显示
      if (this.hiddenEdges.length > 0) {
        edges.push(...this.hiddenEdges)
      }
      if (self.isNode()) {
        //根据字段数量扩展节点大小
        self.size(170, 200 + (this.entity.entityProperties.length - 5) * 28)
        //删除以前的连接桩
        self.removePorts();
        //根据当前字段建立新的连接桩
        self.addPorts(getNodePorts(this.entity.entityProperties).items);
        //恢复连线
        g.addEdges(edges);
      }
    });

    this.expand = true;
  }

  //收起字段
  hiddenField() {
    this.graphProvider.getGraphInstance().then(g => {
      const self = g.getCellById(this.id);
      //当前节点所有连线（分为出和入两种）
      const incomingEdges = g.getIncomingEdges(self);
      const outgoingEdges = g.getOutgoingEdges(self);
      const edges = [];
      //判断节点incoming的连线是否隐藏
      if (incomingEdges != undefined && incomingEdges.length > 0) {
        incomingEdges.forEach(e => {
          if (parseInt(e.getTargetPortId().slice(-1), 10) > 5) {
            this.hiddenEdges.push(e);
          } else {
            edges.push(e);
          }
        });
      }
      //判断节点outgoing的连线是否隐藏
      if (outgoingEdges != undefined && outgoingEdges.length > 0) {
        outgoingEdges.forEach(e => {
          if (parseInt(e.getSourcePortId().slice(-1), 10) > 5) {
            this.hiddenEdges.push(e);
          } else {
            edges.push(e);
          }
        });
      }
      if (self.isNode()) {
        //根据字段数量扩展节点大小
        self.size(170, 200)
        //删除以前的连接桩
        self.removePorts();
        //根据当前字段建立新的连接桩
        self.addPorts(getNodePorts(this.entity.entityProperties.slice(0, 5)).items);
        //恢复连线
        g.addEdges(edges);
      }
    });
    this.expand = false;
  }
  startDrag() {
    const self = this.graph.getCellById(this.id);
    //设置画布与节点无法移动
    self.setProp('unMovable', true);
    this.graph.disablePanning();
    //获取当前节点所有连线
    this.dragEdges = this.graph.getConnectedEdges(self);
    //删除节点上的连线
    this.dragEdges.forEach(e => {
      this.graph.removeEdge(e);
    });
    //删除节点连接桩
    if (self.isNode()) {
      self.removePorts();
    }
  }
  endDrag() {
    const self = this.graph.getCellById(this.id);
    //接触节点和画布无法移动状态
    self.setProp('unMovable', false);
    this.graph.enablePanning()

  }

  drop(event: CdkDragDrop<string>) {
    const self = this.graph.getCellById(this.id);
    //交换数组中数据位置
    moveItemInArray(this.entity.entityProperties, event.previousIndex, event.currentIndex);
    if (self.isNode()) {
      //重新计算连接桩
      if (this.expand) {
        self.addPorts(getNodePorts(this.entity.entityProperties).items);
      } else {
        self.addPorts(getNodePorts(this.entity.entityProperties.slice(0, 5)).items);
      }

    }
    //还原连线
    this.dragEdges.forEach(e => {

    });
    this.graph.addEdges(this.dragEdges);


  }
}
