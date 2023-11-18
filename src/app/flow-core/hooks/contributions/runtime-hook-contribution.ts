import { IHookContribution, IHooks, IHookService } from '@/app/flow-core/hooks/interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RuntimeHookContribution implements IHookContribution<IHooks> {
  registerHook(hooks: IHooks): Promise<any> {
    return Promise.resolve(undefined);
  }

  registerHookHub(registry: IHookService<IHooks>): Promise<any> {
    return Promise.resolve(undefined);
  }
}
