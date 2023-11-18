import { Injectable } from '@angular/core';
import { IHooks, initHooks } from '@/app/flow-core/hooks/interface';
import { HookHub } from '@/app/flow-core/hooks/hookhub';

@Injectable({
  providedIn: 'root'
})
export class HookService<T extends IHooks = any> {
  hooks: T;

  constructor() {
    this.hooks = initHooks() as T;
  }

  /** 注册hook插件 */
  registerHook = (fn: (hooks: T) => any) => {
    return fn(this.hooks);
  };

  /** 注册hook  */
  registerHookHub = (hookName: string, hook: HookHub) => {
    this.hooks[hookName] = hook;
    return {
      dispose: () => {
        delete this.hooks[hookName];
      }
    };
  };

  /** app启动时，收集hook扩展点的注册项 */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onStart() {}
}
