import {
  IHook,
  IHookHub,
  IMainHandler,
  IRuntimeHook,
  ScheduleOptions,
  ScheduleTypeEnum
} from '@/app/flow-core/hooks/interface';

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
  call(args: Args, handler: IMainHandler<Args, Result>, hookMetas: IRuntimeHook<Args>): Promise<Result | undefined> {
    return Promise.resolve(undefined);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  registerHook(hookConfig: IHook): any {}
}
