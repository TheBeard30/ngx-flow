import { Application } from '@/app/flow-core/models';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Node } from '@antv/x6';
import * as MODELS from '@/app/flow-core/constants/model-constant';

@Component({
  selector: 'app-er-canvas-toolbar',
  templateUrl: './er-canvas-toolbar.component.html',
  styleUrls: ['./er-canvas-toolbar.component.less']
})
export class ErCanvasToolbarComponent implements OnInit {
  selectedNode: Node[] = [];

  constructor(private app: Application) { }

  ngOnInit(): void {
    const modelService = this.app && this.app?.modelService;
    if (modelService) {
      MODELS.SELECTED_NODES.getModel(modelService).then(model => {
        model.watch(async () => {
          const nodes = await MODELS.SELECTED_NODES.useValue(modelService);
          this.selectedNode = nodes;
        })
      });
    }
  }
  isDisable(): string {
    return this.selectedNode.length > 0 ? 'text-[rgba(0,0,0,.65)] hover:text-[#000] cursor-pointer' : 'cursor-not-allowed text-[rgba(0,0,0,0.3)]';
  }
  delNode() {
    console.log('delNode')
  }
}
