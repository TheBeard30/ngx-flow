import { Graph } from '@antv/x6';
import { IGraphConfig } from '@/app/flow-core/interfaces';
import { Transform } from '@antv/x6-plugin-transform';
import { Snapline } from '@antv/x6-plugin-snapline';
import { History } from '@antv/x6-plugin-history';
import { Selection } from '@antv/x6-plugin-selection';
import { HookService } from '@/app/flow-core/services/hooks/hook.service';
import { IHooks } from '@/app/flow-core/hooks/interface';
import { CommandService, GraphProviderService, ModelService } from '@/app/flow-core/services';
import { Keyboard } from '@antv/x6-plugin-keyboard';

export interface IGraphManger {
  getGraph: (
    graphId: string,
    hookService: HookService<IHooks>,
    commandService: CommandService,
    modelService: ModelService,
    graphProvider: GraphProviderService
  ) => Promise<Graph>;
}

export class GraphManager implements IGraphManger {
  constructor() { }
  /** 储存画布实例 */
  private graphMap = new Map<string, Graph>();

  private config: IGraphConfig;
  async getGraph(
    graphId: string,
    hookService: HookService<IHooks>,
    commandService: CommandService,
    modelService: ModelService
  ): Promise<Graph> {
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
      const hooks = hookService.hookProvider();
      this.graphMap.set(graphId, graph);
      await hooks.afterGraphInit.call({
        graph,
        commandService: commandService,
        modelService: modelService,
        options: this.config
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
      const resizeHandle = ({ node }) => {
        console.log('resizeHandle');
        const nodeData = node.getData();
        const size = node.size();
        if (nodeData.ngArguments) {
          nodeData.ngArguments.size = {
            width: size?.width,
            height: size?.height
          };
        }
        node.setData({
          ...nodeData,
          width: size?.width,
          height: size?.height
        });
      };
      graph.on('node:resized', resizeHandle);
      graph.on('node:resizing', resizeHandle);
      const resizingOptions = {
        ...this.config.x6Options['resizing']
      };
      //改变节点大小
      graph.use(
        new Transform({
          resizing: Object.keys(resizingOptions).length ? resizingOptions : true,
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
      graph.use(
        new History({
          enabled: true
        })
      );
      graph.use(
        new Selection({
          enabled: true,
          multiple: true,
          showNodeSelectionBox: true
        })
      );
      graph.use(
        new Keyboard({
          enabled: true
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
