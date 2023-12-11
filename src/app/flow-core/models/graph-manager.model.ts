import { Graph } from '@antv/x6';
import { IGraphConfig } from '@/app/flow-core/interfaces';
import { Transform } from '@antv/x6-plugin-transform';
import { Snapline } from '@antv/x6-plugin-snapline';

export interface IGraphManger {
  getGraph: (graphId: string) => Promise<Graph>;
}

export class GraphManager implements IGraphManger {
  /** 储存画布实例 */
  private graphMap = new Map<string, Graph>();

  private config: IGraphConfig;
  getGraph(graphId: string): Promise<Graph> {
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
      this.graphMap.set(graphId, graph);
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
      graph.use(new Transform({
        resizing: {
          enabled: true,
          minWidth: 1,
          maxWidth: 200,
          minHeight: 1,
          maxHeight: 150,
          orthogonal: false,
          restrict: false,
          preserveAspectRatio: false
        }
      }));
      //对齐辅助线
      graph.use(new Snapline(
        {
          enabled: true,
          clean: false
        }
      ))
    }

    return Promise.resolve(graph);
  }

  // TODO TEST
  setConfig(config: IGraphConfig) {
    this.config = config;
  }
}
