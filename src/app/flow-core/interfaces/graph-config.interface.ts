import { Graph as X6Graph } from '@antv/x6';
import { NsGraph } from '@/app/flow-core/interfaces/graph.interface';

export interface IGraphConfig {
  /** xflow实例id */
  xflowInstanceId: string;
  /** 画布实例id */
  graphId: string;
  nodeViewId: string;
  /** 画布的options */
  x6Options: X6Graph.Options;
  /** app 的 root 节点 */
  appContainer: HTMLElement;
  /** 画布的root节点 */
  rootContainer: HTMLElement;
  /** 画布的dom节点 */
  graphContainer: HTMLElement;
  /** 自定节点的渲染 */
  nodeRender: Map<string, any>;
  /** 自定义边label的渲染 */
  edgeRender: Map<string, any>;
  /** 自定义X6事件 */
  events: NsGraph.IEvent[];
  /** 解析node类型：从nodeConfig 中解析 Component类型 */
  nodeTypeParser: (nodeConfig: NsGraph.INodeConfig) => string;
  /** 解析edge类型：从edgeConfig 中解析 Component类型 */
  edgeTypeParser: (edgeConfig: NsGraph.IEdgeConfig) => string;
}
