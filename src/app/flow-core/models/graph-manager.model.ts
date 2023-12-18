import { Graph } from '@antv/x6';
import { IGraphConfig } from '@/app/flow-core/interfaces';
import { Transform } from '@antv/x6-plugin-transform';
import { Snapline } from '@antv/x6-plugin-snapline';
import { HookService } from '@/app/flow-core/services/hooks/hook.service';
import { IHooks } from '@/app/flow-core/hooks/interface';
import { CommandService, GraphProviderService, ModelService } from '@/app/flow-core/services';
import { Injectable } from '@angular/core';

export interface IGraphManger {
  getGraph: (graphId: string) => Promise<Graph>;
}

export class GraphManager implements IGraphManger {
  constructor(
    private hookService: HookService<IHooks>,
    private commandService: CommandService,
    private modelService: ModelService,
    public graphProvider: GraphProviderService
  ) {}
  /** 储存画布实例 */
  private graphMap = new Map<string, Graph>();

  private config: IGraphConfig;
  async getGraph(graphId: string): Promise<Graph> {
    let graph = this.graphMap.get(graphId);
    if (!graph) {
      const { graphContainer } = this.config;
      const { clientHeight, clientWidth } = graphContainer;
      /** 实例化 X6 Graph */
      graph = new Graph({
        container: graphContainer,
        width: clientWidth,
        height: clientHeight,
        ...this.config.x6Options
      });
      const hooks = this.hookService.hookProvider();
      this.graphMap.set(graphId, graph);
      await hooks.afterGraphInit.call({
        graph,
        commandService: this.commandService,
        modelService: this.modelService,
        options: (await this.graphProvider.getGraphOptions()) as unknown as IGraphConfig
      });
      graph.on('node:moved', ({ node }) => {
        const nodeData = node.getData();
        const position = node.position();
        node.setData({
          ...nodeData,
          x: position?.x,
          y: position?.y
        });
      });
      graph.on('node:resized', ({ node }) => {
        const nodeData = node.getData();
        const size = node.size();
        node.setData({
          ...nodeData,
          width: size?.width,
          height: size?.height
        });
      });
      //改变节点大小
      graph.use(
        new Transform({
          resizing: true,
          rotating: false
        })
      );
      //对齐辅助线
      graph.use(
        new Snapline({
          enabled: true,
          clean: false
        })
      );
    }

    return Promise.resolve(graph);
  }

  // TODO TEST
  setConfig(config: IGraphConfig) {
    this.config = config;
  }
}
