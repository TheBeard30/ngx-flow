import { IHookContribution, IHooks, IHookService } from '@/app/flow-core/hooks/interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GraphEventHookContribution implements IHookContribution<IHooks> {
  registerHook(hooks: IHooks): Promise<any> {
    return Promise.resolve({});
  }

  registerHookHub(): Promise<any> {
    return Promise.resolve(undefined);
  }
}
