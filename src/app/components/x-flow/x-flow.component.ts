import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  Inject,
  Input,
  QueryList,
  ViewChild
} from '@angular/core';
import { CommandInjectionToken, IGraphCommandService, IGraphData, IGraphMeta } from '@/app/interfaces';
import { Application } from '@/app/models';
import { initApp } from '@/app/utils/app.util';
import { XFlowGraphCommands } from '@/app/constants';
import { GraphProviderService, ModelService } from '@/app/services';

@Component({
  selector: 'app-x-flow',
  templateUrl: './x-flow.component.html',
  styleUrls: ['./x-flow.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XFlowComponent implements AfterViewInit {
  @ViewChild('XFlow') XFlow!: ElementRef;

  @ContentChildren('content') content!: QueryList<any>;

  @Input() meta!: IGraphMeta;

  @Input() graphConfig: any;

  @Input() graphData!: IGraphData;

  haveCanvasComponent = false;

  app: Application;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    @Inject(CommandInjectionToken) private commandService: IGraphCommandService,
    private graphProvider: GraphProviderService,
    private modelService: ModelService
  ) {}

  ngAfterViewInit(): void {
    console.log(this.content);
    this.haveCanvasComponent = this.content.some(child => child && child.isXFlowCanvas);
    this.app = initApp(this.graphProvider, this.commandService, this.modelService);
    setTimeout(async () => {
      console.log('commandService>>>', this.commandService);
      await this.app.commandService.executeCommand(XFlowGraphCommands.GRAPH_LAYOUT.id, { graphData: this.graphData });
      await this.app.commandService.executeCommand(XFlowGraphCommands.GRAPH_RENDER.id, { graphData: this.graphData });
    });
  }
}
