import { EventArgs, Graph } from '@antv/x6';
import { IGraphCommandService, IGraphConfig, NsGraph } from '@/app/flow-core/interfaces';
import { IModelService } from '@/app/flow-core/interfaces/model.interface';
import { HookHub } from '@/app/flow-core/hooks/hookhub';

/**
 * IHookHub的handler回调
 */
export interface IMainHandler<Args = any, Result = any> {
  (args: Args): Promise<Result>;
}
export interface IHook<Args = any, Result = any> {
  name: string;
  handler: (args: Args, mainHandler?: IMainHandler<Args, Result>) => Promise<null | void | IMainHandler<Args, Result>>;
  after?: string;
  before?: string;
}

/** 运行时的hook参数 */
export type IRuntimeHook<Args = any, Result = any> = IHook<Args, Result> | IHook<Args, Result>[];

export interface IHookHub<Args, Result> {
  /** 注册hook */
  registerHook: (hookConfig: IHook) => any;
  /** 执行所有hook */
  call: (args: Args, handler: IMainHandler<Args, Result>, hookMetas: IRuntimeHook<Args>) => Promise<Result | undefined>;
}

/** hooks 执行的策略 */
export enum ScheduleTypeEnum {
  /** pipeline串行执行：所有async任务完成后再执行回调 */
  'ASYNC_SRRIES' = 'ASYNC_SRRIES',
  /** async并行执行：等待Promise.all所有async任务后再执行回调 */
  'ASYNC_PARALLEL' = 'ASYNC_PARALLEL'
}

/** 执行的策略  */
export interface ScheduleOptions {
  type: ScheduleTypeEnum;
  options: any;
}

/** 内置的Hooks */
export type IEvent<Key extends keyof EventArgs> = NsGraph.IEvent<Key>;
export type IEventCollection = NsGraph.IEvent[];
export type IEventSubscription = any[];

export interface IGeneralAppService {
  graph: Graph;
  commandService: IGraphCommandService;
  modelService: IModelService;
  options: IGraphConfig;
}

export const initHooks = () => ({
  graphOptions: new HookHub<Graph.Options>(),
  afterGraphInit: new HookHub<IGeneralAppService>(),
  beforeGraphDestroy: new HookHub<IGeneralAppService>(),
  x6Events: new HookHub<IEventCollection, IEventSubscription>()
});

export type IHooks = ReturnType<typeof initHooks>;

export interface IHookService<T = IHooks> {
  registerHookHub: (hookName: string, hook: HookHub) => any;
  registerHook: (registerHookFunc: IRegisterHookFn<T>) => any;
  hookProvider: () => T;
}

export interface IRegisterHookFn<T = IHooks> {
  (hooks: T): any;
}

export interface IRegisterHookHubFn<T = IHooks> {
  (registry: IHookService<T>): any;
}

/**
 * 扩展hook
 */
export interface IHookContribution<T extends IHooks> {
  /**
   * 注册hook
   * @param registry the HookRegistry.
   */
  registerHook: (hooks: T) => Promise<any>;
  /**
   * 注册hookhub
   * @param registry the HookRegistry.
   */
  registerHookHub: (registry: IHookService<T>) => Promise<any>;
}
