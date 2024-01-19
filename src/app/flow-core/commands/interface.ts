import { Graph } from '@antv/x6';
import { IGraphCommandService, IGraphConfig } from '@/app/flow-core/interfaces';
import { ModelService } from '@/app/flow-core/services';
import { Simplify } from '@/app/flow-core/common/types';
import type { ICmdHooks as IGraphHooks } from './graph';
import { IModelService } from '@/app/flow-core/interfaces/model.interface';
import { IHooks } from '../hooks/interface';

export interface IContext<Args = any, Result = any, Hooks = IHooks> {
  undo: () => Promise<void>;
  getArgs: () => any;
  setArgs: (args: Args) => void;
  /** 获取结果 */
  getResult: () => Result
  /** 设置结果 */
  setResult: (result: Result) => Result
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

/** 执行command参数的基类 */
export interface IArgsBase {
  commandService?: IGraphCommandService;
  modelService?: IModelService;
}

export type ICmdHooks = Simplify<IGraphHooks>;
