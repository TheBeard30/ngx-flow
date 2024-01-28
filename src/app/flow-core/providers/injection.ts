import { InjectionToken, Provider } from '@angular/core';
import { IHooks, IHookService } from '@/app/flow-core/hooks/interface';
import { RuntimeHookContribution } from '@/app/flow-core/hooks/contributions/runtime-hook-contribution';
import { GraphEventHookContribution } from '@/app/flow-core/hooks/contributions/graph-event-hook-contribution';
import { CommandContributionService } from '@/app/flow-core/services/command/command-contribution.service';
import { KeybindingService } from '@/app/flow-core/services';
import { Disposable } from '../common/disposable';
import { IModelService } from '@/app/flow-core/interfaces/model.interface';
import { IMenuService } from '@/app/flow-core/interfaces';

export const HookToken = new InjectionToken<IHookService<IHooks>>('hook token');

export const hookProviders: Provider[] = [
  { provide: HookToken, useClass: RuntimeHookContribution, multi: true },
  { provide: HookToken, useClass: GraphEventHookContribution, multi: true },
  { provide: HookToken, useClass: CommandContributionService, multi: true }
];

export const KeyBindingToken = new InjectionToken<IKeyBindingContribution>('keyboard token');

export interface IKeyBindingContribution {
  /**
   * 注册keybinding
   * @param registry KeyBindingRegistry.
   */
  registerKeybinding: (registry: KeybindingService) => Disposable;
}

export const MenuToken = new InjectionToken<IMenu>('menu token');

export interface IMenu {
  /**
   * 注册Menu
   * @param registry the toolbar registry.
   */
  registerMenu: (registry: IMenuService) => void;
}

/**
 * 扩展Model
 */
export interface IModel {
  /**
   * 注册Model
   * @param registry the toolbar registry.
   */
  registerModel: (registry: IModelService) => void;
}

export const ModelToken = new InjectionToken<IModel>('model token');
