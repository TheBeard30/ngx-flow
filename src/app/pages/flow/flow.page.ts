import { Component } from '@angular/core';
import { useMenuConfig } from '@/app/flow-extension/context-menu/context-menu.config';

@Component({
  selector: 'app-flow',
  templateUrl: './flow.page.html',
  styleUrls: ['./flow.page.less']
})
export class FlowPage {
  graphData;

  menuConfig = useMenuConfig();

  onload = app => {
    console.log('flow app>>>', app);
  };
}
