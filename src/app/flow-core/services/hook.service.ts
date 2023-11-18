import { Injectable } from '@angular/core';
import { IGeneralAppService, IHooks, IHookService, initHooks } from '@/app/flow-core/hooks/interface';
import { HookHub } from '@/app/flow-core/hooks/hookhub';
import { RuntimeHookContribution } from '@/app/flow-core/hooks/contributions/runtime-hook-contribution';
import { GraphEventHookContribution } from '@/app/flow-core/hooks/contributions/graph-event-hook-contribution';
import { CommandContributionService } from '@/app/flow-core/services/command-contribution.service';
import { Graph } from '@antv/x6';
import { HookConfig } from '@/app/flow-core/hooks/hook-config';

@Injectable({
  providedIn: 'root'
})
export class HookService<T extends IHooks> implements IHookService<T> {
  hooks: T;

  hookConfig: HookConfig;

  constructor(
    private runtimeHookContribution: RuntimeHookContribution,
    private graphEventHookContribution: GraphEventHookContribution,
    private commandContributionService: CommandContributionService
  ) {
    this.hooks = initHooks() as T;
    const hookConfig = new HookConfig();
    this.hookConfig = hookConfig;
    this.runtimeHookContribution.hookConfig = hookConfig;
  }

  hookProvider = () => this.hooks;

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
  onStart() {
    this.runtimeHookContribution.registerHookHub(this);
    this.graphEventHookContribution.registerHookHub();
    this.commandContributionService.registerHookHub(this as any);
    this.runtimeHookContribution.registerHook(this.hooks);
    this.graphEventHookContribution.registerHook(this.hooks);
    this.commandContributionService.registerHook(this.hooks as any);
  }

  setHookConfig(hookConfig: HookConfig) {
    this.hookConfig = hookConfig;
    this.runtimeHookContribution.hookConfig = hookConfig;
  }
}
