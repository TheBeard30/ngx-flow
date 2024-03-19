import { GraphProviderService } from '@/app/flow-core/services';
import { SimpleNodeView } from '@/app/flow-extension/minimap/simple-node-view/simple-node-view.component';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MiniMap } from '@antv/x6-plugin-minimap';
import { Scroller } from '@antv/x6-plugin-scroller';

@Component({
  selector: 'app-minimap',
  templateUrl: './minimap.component.html',
  styleUrls: ['./minimap.component.less']
})
export class MinimapComponent implements AfterViewInit {
  @ViewChild('MiniMap') miniMapRef: ElementRef;

  @ViewChild('box') box: ElementRef;

  constructor(private graphProvider: GraphProviderService) { }

  ngAfterViewInit(): void {
    setTimeout(async () => {
      const graph = await this.graphProvider.getGraphInstance();
      graph.use(
        new Scroller({
          enabled: false,
          pannable: true,
        })
      );
      graph.use(new MiniMap({
        container: this.miniMapRef.nativeElement,
        width: 180,
        height: 100,
        graphOptions: {
          createCellView(cell) {
            if (cell.isEdge()) {
              return null
            }
            if (cell.isNode()) {
              return SimpleNodeView
            }
            return null;
          },
        },
      }));
    });
  }

}
