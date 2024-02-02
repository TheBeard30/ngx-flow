import { GraphProviderService } from '@/app/flow-core/services';
import { getPorts } from '@/app/flow-extension/flow-chart/flow-node-panel/utils';
import { Component, ElementRef, EventEmitter, ViewChild } from '@angular/core';

@Component({
  selector: 'app-er',
  templateUrl: './er.component.html',
  styleUrls: ['./er.component.less']
})
export class ErComponent {
  graphData;
  graphStatus = 'NORMAL';
  /** 鼠标的引用 */
  @ViewChild('cursorTipRef') cursorTipRef: ElementRef;
  //添加节点位置
  cursorLocation: any;
  //是否显示CreateNodeModal
  IsShowCreateNodeModal = false;
  //暂时将数据写死
  entity: any = {
    entityName: '测试表',
    entityType: 'FACT',
    entityProperties: [
      {
        propertyName: "姓名",
        propertyType: "string",
        isPK: true,
        isFK: false
      },
      {
        propertyName: "年龄",
        propertyType: "int",
        isPK: false,
        isFK: false
      },
      {
        propertyName: "性别",
        propertyType: "string",
        isPK: false,
        isFK: false
      },
      {
        propertyName: "身份",
        propertyType: "string",
        isPK: false,
        isFK: true
      },
      {
        propertyName: "性别",
        propertyType: "string",
        isPK: false,
        isFK: false
      },
      {
        propertyName: "性别",
        propertyType: "string",
        isPK: false,
        isFK: false
      },
      {
        propertyName: "性别",
        propertyType: "string",
        isPK: false,
        isFK: false
      },
      {
        propertyName: "性别",
        propertyType: "string",
        isPK: false,
        isFK: false
      },
      {
        propertyName: "性别",
        propertyType: "string",
        isPK: false,
        isFK: false
      },
    ]
  };

  constructor(private graphProvider: GraphProviderService) { }

  onload = app => {
    console.log('flow app>>>', app);
  };

  onclick() {
    this.graphProvider.getGraphInstance().then(g => {
      //删除transfrom插件
      g.disablePlugins('transform');
      //创建er-node节点
      const node = g.createNode({ shape: "er-node", position: { x: this.cursorLocation.x, y: this.cursorLocation.y - 40 }, ports: getPorts() });
      node.setData({
        ngArguments: {
          entity: this.entity,
          id: node.id
        }
      })
      g.addNode(node)
    });
  }
  //改变建立节点提示框状态
  configCursorTip({ left, top, display }) {
    this.cursorTipRef.nativeElement.style.left = left;
    this.cursorTipRef.nativeElement.style.top = top;
    this.cursorTipRef.nativeElement.style.display = display;
  }
  //创建节点过程中鼠标事件监听
  mouseMove(e) {
    if (this.graphStatus === 'CREATE') {
      this.configCursorTip({
        left: `${e.pageX}px`,
        top: `${e.pageY}px`,
        display: 'block',
      });
    }
  }
  mouseDown(e) {
    if (this.graphStatus === 'CREATE') {
      console.log('mouseDown')
      this.cursorLocation = { x: e.pageX, y: e.pageY }
      this.IsShowCreateNodeModal = true;
      this.onclick()
      this.configCursorTip({
        left: '0px',
        top: '0px',
        display: 'none',
      })
      this.changeGraphStatus('NORMAL')
    }
  }
  mouseLeave(e) {
    if (this.graphStatus === 'CREATE') {
      this.configCursorTip({
        left: '0px',
        top: '0px',
        display: 'none',
      })
    }
  }

  changeGraphStatus(status: string) {
    this.graphStatus = status;
  }
}
