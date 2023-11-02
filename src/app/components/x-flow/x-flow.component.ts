import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  Inject,
  Injector,
  Input,
  OnInit,
  QueryList,
  ViewChild
} from '@angular/core';
import { CommandInjectionToken, IGraphCommandService, IGraphData, IGraphMeta } from '@/app/interfaces';
import { Application } from '@/app/models';
import { initApp } from '@/app/utils/app.util';
import { XFlowGraphCommands } from '@/app/constants';
import { CommandService, GraphProviderService, ModelService } from '@/app/services';

@Component({
  selector: 'app-x-flow',
  templateUrl: './x-flow.component.html',
  styleUrls: ['./x-flow.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XFlowComponent implements OnInit {
  @ViewChild('XFlow') XFlow!: ElementRef;

  @ContentChildren('content') content!: QueryList<any>;

  @Input() meta!: IGraphMeta;

  @Input() graphConfig: any;

  @Input() graphData!: IGraphData;

  haveCanvasComponent = false;

  app: Application;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    private commandService: CommandService,
    private graphProvider: GraphProviderService,
    private injector: Injector
  ) {}

  ngOnInit(): void {
    // this.haveCanvasComponent = this.content.some(child => child && child.isXFlowCanvas);
    this.app = initApp(this.injector);
    this.app.start();
    setTimeout(async () => {
      console.log('commandService>>>', this.commandService);
      // await this.app.commandService.executeCommand(XFlowGraphCommands.GRAPH_LAYOUT.id, { graphData: this.graphData });
      await this.app.commandService.executeCommand(
        XFlowGraphCommands.GRAPH_RENDER.id,
        { graphData: this.graphData },
        null
      );
      this.graphProvider.getGraphInstance().then(g => g.centerContent());
    }, 1000);
  }
}
