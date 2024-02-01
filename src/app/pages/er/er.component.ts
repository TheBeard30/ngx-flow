import { GraphProviderService } from '@/app/flow-core/services';
import { getPorts } from '@/app/flow-extension/flow-chart/flow-node-panel/utils';
import { Component } from '@angular/core';

@Component({
  selector: 'app-er',
  templateUrl: './er.component.html',
  styleUrls: ['./er.component.less']
})
export class ErComponent {
  graphData;

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
      const node = g.createNode({ shape: "er-node", ports: getPorts() });
      node.setData({
        ngArguments: {
          entity: this.entity,
          id: node.id
        }
      })
      g.addNode(node)
    });
  }
}
