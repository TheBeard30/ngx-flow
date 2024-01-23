import { IGraphConfig, IGraphProvider } from '@/app/flow-core/interfaces';
import { Injectable } from '@angular/core';
import { Graph } from '@antv/x6';
import { GraphManager } from '@/app/flow-core/models';
import { HookService } from '@/app/flow-core/services/hooks/hook.service';
import { IHooks } from '@/app/flow-core/hooks/interface';
import { CommandService } from '@/app/flow-core/services/command/command.service';
import { ModelService } from '@/app/flow-core/services/model/model.service';

@Injectable()
export class GraphProviderService implements IGraphProvider {
  private graphInstance: Graph;

  private graphConfig: IGraphConfig;

  constructor(
    public commandService: CommandService,
    public hookService: HookService<IHooks>,
    public modelService: ModelService
  ) {}

  public groupManager: GraphManager;

  async getGraphInstance(): Promise<Graph> {
    this.graphInstance = await this.groupManager.getGraph(
      this.graphConfig.graphId,
      this.hookService,
      this.commandService,
      this.modelService
    );
    return Promise.resolve(this.graphInstance);
  }

  getGraphOptions(): Promise<IGraphConfig> {
    return Promise.resolve(this.graphConfig);
  }

  setGraphInstance(graph: Graph) {
    this.graphInstance = graph;
  }

  setGraphOptions(graphConfig: IGraphConfig) {
    this.groupManager = new GraphManager();
    this.graphConfig = graphConfig;
    this.groupManager.setConfig(this.graphConfig);
  }
}
