import {
  IHook,
  IHookHub,
  IMainHandler,
  IRuntimeHook,
  ScheduleOptions,
  ScheduleTypeEnum
} from '@/app/flow-core/hooks/interface';
import { HookUtils } from '@/app/flow-core/hooks/utils';

export class HookHub<Args = any, Result = Args | null> implements IHookHub<Args, Result> {
  /** hooks */
  private hookMap: Map<string, IHook<Args, Result>>;

  /** scheduleType */
  private scheduleType: ScheduleTypeEnum = ScheduleTypeEnum.ASYNC_SRRIES;

  constructor(options?: ScheduleOptions) {
    this.hookMap = new Map<string, IHook<Args, Result>>();
    if (options && options.type) {
      this.scheduleType = options.type;
    }
  }

  /** hasRegistered */
  hasHook = (hookName: string): boolean => {
    return this.hookMap.has(hookName);
  };

  /** getHooks */
  getHooks = (runtimeHooks: IRuntimeHook<Args, Result> = [], sort = true): IHook<Args, Result>[] => {
    const hooks = HookUtils.normalize(runtimeHooks, this.hookMap);
    return hooks;
  };

  call(args: Args, main: IMainHandler<Args, Result>, runtimeHook: IRuntimeHook<Args>): Promise<Result | undefined> {
    const hooks = this.getHooks(runtimeHook, true);
    const scheduler = this.schedulers[this.scheduleType];
    return scheduler(args, main, hooks);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  registerHook(hookConfig: IHook): any {}

  /** 执行hook的scheduler */
  private schedulers = {
    /** pipeline执行 */
    [ScheduleTypeEnum.ASYNC_SRRIES]: async (
      args: Args,
      main: (args: Args) => Promise<Result>,
      hooks: IHook<Args, Result>[] = []
    ) => {
      let callback: null | ((args: Args) => Promise<Result>) = main;
      /** 用 hook 加工 args  */
      for (const hook of hooks) {
        if ([0, 1].includes(hook.handler.length)) {
          await hook.handler.call(this, args);
          continue;
        }
        if ([2].includes(hook.handler.length) && callback !== null) {
          // eslint-disable-next-line @typescript-eslint/no-shadow
          const result: void | null | ((args: Args) => Promise<Result>) = await hook.handler.call(this, args, callback);
          /** 如果返回为null，则直接中断执行 */
          if (result === null) {
            callback = null;
            break;
          } else if (typeof result === 'function') {
            callback = result;
            continue;
          }
        }
        // const err = ErrorUtils.InvalidHookArguments(hook)
        // throw err
      }
      /** 检查是否被替换为null */
      if (callback) {
        return await callback.call(this, args);
      }
    },
    [ScheduleTypeEnum.ASYNC_PARALLEL]: async (
      args: Args,
      main: (args: Args) => Promise<Result>,
      hooks: IHook<Args, Result>[] = []
    ) => {
      /** 同时触发 hook */
      const promises = hooks.map(hook => {
        if ([0, 1].includes(hook.handler.length)) {
          return hook.handler.call(this, args);
        }
        if ([2].includes(hook.handler.length)) {
          return hook.handler.call(this, args, main);
        }
        // throw ErrorUtils.InvalidHookArguments(hook)
      });
      // const defer = new Deferred()
      // Promise.all(promises).then(res => defer.resolve(res))
      /** 检查是否被替换 */
      if (main) {
        return await main.call(this);
      }
    }
  } as const;
}
