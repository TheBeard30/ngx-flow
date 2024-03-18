import { Application } from '@/app/flow-core/models';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Edge, Node } from '@antv/x6';
import * as MODELS from '@/app/flow-core/constants/model-constant';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommandService } from '@/app/flow-core/services';
import { XFlowEdgeCommands, XFlowGraphCommands, XFlowNodeCommands } from '@/app/flow-core/constants';
import { NsGraphFullscreen, NsGraphZoom } from '@/app/flow-core/commands';

@Component({
  selector: 'app-er-canvas-toolbar',
  templateUrl: './er-canvas-toolbar.component.html',
  styleUrls: ['./er-canvas-toolbar.component.less']
})
export class ErCanvasToolbarComponent implements OnInit {
  selectedNode: Node[] = [];
  selectedEdge: Edge[] = [];
  //画布状态监听
  @Output() changeGraphStatus = new EventEmitter<string>;

  //数据源
  @Input() dataSource: string;
  @Input() dataSourceMenu: any;
  @Output() changeDataSource = new EventEmitter<string>;

  //画布是否全屏
  fullScreen = false;

  constructor(private app: Application, private commandService: CommandService, private message: NzMessageService) { }

  ngOnInit(): void {
    const modelService = this.app && this.app?.modelService;
    if (modelService) {
      MODELS.SELECTED_NODES.getModel(modelService).then(model => {
        model.watch(async () => {
          const nodes = await MODELS.SELECTED_NODES.useValue(modelService);
          this.selectedNode = nodes;
        })
      });
      MODELS.SELECTED_CELLS.getModel(modelService).then(model => {
        model.watch(async () => {
          const cells = await MODELS.SELECTED_CELLS.useValue(modelService);
          this.selectedEdge = cells.filter(cell => cell.isEdge()) as Edge[];
        })
      });
      //监听画布是否全屏
      MODELS.GRAPH_FULLSCREEN.getModel(modelService).then(model => {
        /** 初始化全屏默认值 */
        model.setValue(false);
        model.watch(fullscreen => {
          this.fullScreen = fullscreen;
        })
      })
    }
  }
  //画布操作
  zoom(factor: number | "fit" | "real") {
    this.commandService.executeCommand<NsGraphZoom.IArgs, NsGraphZoom.IResult>(XFlowGraphCommands.GRAPH_ZOOM.id, {
      factor: factor,
      zoomOptions: { maxScale: 1.5, minScale: 0.05 }
    });
    return null;
  }

  //删除节点按钮样式交互
  isDisable(type: string): string {
    if (type === 'node') {
      return this.selectedNode.length > 0 ? 'text-[rgba(0,0,0,.65)] hover:text-[#000] cursor-pointer' : 'cursor-not-allowed text-[rgba(0,0,0,0.3)]';
    } else if (type === 'edge') {
      return this.selectedEdge.length > 0 ? 'text-[rgba(0,0,0,.65)] hover:text-[#000] cursor-pointer' : 'cursor-not-allowed text-[rgba(0,0,0,0.3)]';
    }
    return null;

  }
  //删除节点
  delNode() {
    this.selectedNode.forEach(node => {
      const data = node.getData()
      this.commandService.executeCommand(XFlowNodeCommands.DEL_NODE.id, {
        nodeConfig: {
          id: data.ngArguments.id
        }
      });
    });
  }
  //删除关系
  delEdge() {
    this.selectedEdge.forEach(edge => {
      this.commandService.executeCommand(XFlowEdgeCommands.DEL_EDGE.id, {
        x6Edge: edge
      });
    });
  }
  //切换全屏
  toggleFullScreen() {
    this.commandService.executeCommand<NsGraphFullscreen.IArgs, NsGraphFullscreen.IResult>(XFlowGraphCommands.GRAPH_FULLSCREEN.id, {})
  }

}
