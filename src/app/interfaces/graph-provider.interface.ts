import { Graph as X6Graph } from '@antv/x6';
import { IGraphConfig } from '@/app/interfaces';

export interface IGraphProvider {
  /** 获取画布实例 */
  getGraphInstance: () => Promise<X6Graph>;
  /** 获取画布配置项 */
  getGraphOptions: () => Promise<IGraphConfig>;

  setGraphInstance: (graph: X6Graph) => void;

  setGraphOptions: (config: IGraphConfig) => void;
}
