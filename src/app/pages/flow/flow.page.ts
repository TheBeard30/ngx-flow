import { Component } from '@angular/core';

@Component({
  selector: 'app-flow',
  templateUrl: './flow.page.html',
  styleUrls: ['./flow.page.less']
})
export class FlowPage {
  graphData;

  onload = app => {
    console.log('flow app>>>', app);
  };
}
