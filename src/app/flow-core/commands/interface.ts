import { Graph } from '@antv/x6';
import { IGraphCommandService, IGraphConfig } from '@/app/flow-core/interfaces';
import { ModelService } from '@/app/flow-core/services';
import { Simplify } from '@/app/flow-core/common/types';
import type { ICmdHooks as IGraphHooks } from './graph';

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

export type ICmdHooks = Simplify<IGraphHooks>;
