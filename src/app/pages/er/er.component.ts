import { GraphProviderService } from '@/app/flow-core/services';
import { Component } from '@angular/core';

@Component({
  selector: 'app-er',
  templateUrl: './er.component.html',
  styleUrls: ['./er.component.less']
})
export class ErComponent {
  graphData;

  constructor(private graphProvider: GraphProviderService) { }

  onload = app => {
    console.log('flow app>>>', app);
  };

  onclick() {
    this.graphProvider.getGraphInstance().then(g => {
      console.log("画布", g)
      g.addNode({ shape: "er-node" })
    })
  }
}
