import { IHookContribution, IHooks, IHookService } from '@/app/flow-core/hooks/interface';
import { Injectable } from '@angular/core';
import { HookConfig } from '@/app/flow-core/hooks/hook-config';

@Injectable({
  providedIn: 'root'
})
export class RuntimeHookContribution implements IHookContribution<IHooks> {
  hookConfig: HookConfig;

  registerHook = async (hooks: IHooks): Promise<any> => {
    const { hookRegisterFn } = await this.hookConfig.getConfig();
    hookRegisterFn(hooks);
  };

  registerHookHub = async (registry: IHookService<IHooks>): Promise<any> => {
    const { hookhubRegisterFn } = await this.hookConfig.getConfig();
    hookhubRegisterFn(registry);
  };
}
