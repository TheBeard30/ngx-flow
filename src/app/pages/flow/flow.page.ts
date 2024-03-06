import { Component, OnInit } from '@angular/core';
import { useMenuConfig } from '@/app/flow-extension/context-menu/context-menu.config';
import { IGraphConfig, NsGraph } from '@/app/flow-core/interfaces';
import { Application } from '@/app/flow-core/models';
import { CustomNodeComponent } from './custom-node/custom-node.component';

@Component({
  selector: 'app-flow',
  templateUrl: './flow.page.html',
  styleUrls: ['./flow.page.less']
})
export class FlowPage {
  graphData: NsGraph.IGraphData;

  menuConfig = useMenuConfig();

  graphConfig: IGraphConfig;

  registerNode = [{
    title: '自定义节点', nodes: [{
      component: CustomNodeComponent,
      name: 'custom-node-indicator',
      width: 100,
      height: 100,
      label: '自定义节点',
    }]
  }]

  onload = (app: Application) => {
    console.log('flow app>>>', app);
  };
}
