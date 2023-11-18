import { IHook, IHookHub, IMainHandler, IRuntimeHook } from '@/app/flow-core/hooks/interface';

export class HookHub<Args = any, Result = Args | null> implements IHookHub<Args, Result> {
  call(args: Args, handler: IMainHandler<Args, Result>, hookMetas: IRuntimeHook<Args>): Promise<Result | undefined> {
    return Promise.resolve(undefined);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  registerHook(hookConfig: IHook): any {}
}
