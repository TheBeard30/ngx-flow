import { Component, OnInit } from '@angular/core';
import { useMenuConfig } from '@/app/flow-extension/context-menu/context-menu.config';
import { IGraphConfig, NsGraph } from '@/app/flow-core/interfaces';
import { Application } from '@/app/flow-core/models';

@Component({
  selector: 'app-flow',
  templateUrl: './flow.page.html',
  styleUrls: ['./flow.page.less']
})
export class FlowPage {
  graphData: NsGraph.IGraphData;

  menuConfig = useMenuConfig();

  graphConfig: IGraphConfig;

  onload = (app: Application) => {
    console.log('flow app>>>', app);
  };
}
