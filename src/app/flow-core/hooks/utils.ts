import { IHook } from '@/app/flow-core/hooks/interface';

export namespace HookUtils {
  /** 处理 runtime hooks */
  export const normalize = (hookConfig: IHook | IHook[] = [], hookMap: Map<string, IHook>): IHook[] => {
    const runtimeHook = Array.isArray(hookConfig) ? hookConfig : [hookConfig];
    const innerHooks: IHook[] = [];
    hookMap.forEach(val => {
      innerHooks.push(val);
    });

    return [...innerHooks, ...runtimeHook].filter(item => item && !!item.handler);
  };
}
