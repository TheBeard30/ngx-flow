import { Graph } from '@antv/x6';
import { IGraphCommandService, IGraphConfig } from '@/app/interfaces';
import { ModelService } from '@/app/services';

export interface IContext<Args = any> {
  undo: () => Promise<void>;
  getArgs: () => any;
  setArgs: (args: Args) => void;
  /** 获取Graph */
  getX6Graph: () => Promise<Graph>;
  /** 获取GraphMeta */
  getGraphMeta: () => Promise<any>;
  /** 获取Graph配置 */
  getGraphConfig: () => Promise<IGraphConfig>;
  /** 获取Command */
  getCommands: () => IGraphCommandService;
  /** 获取ModelService */
  getModelService: () => ModelService;
}
