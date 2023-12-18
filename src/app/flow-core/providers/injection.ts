import { InjectionToken, Provider } from '@angular/core';
import { IHooks, IHookService } from '@/app/flow-core/hooks/interface';
import { RuntimeHookContribution } from '@/app/flow-core/hooks/contributions/runtime-hook-contribution';
import { GraphEventHookContribution } from '@/app/flow-core/hooks/contributions/graph-event-hook-contribution';
import { CommandContributionService } from '@/app/flow-core/services/command/command-contribution.service';

export const HookToken = new InjectionToken<IHookService<IHooks>>('hook token');

export const hookProviders: Provider[] = [
  { provide: HookToken, useClass: RuntimeHookContribution, multi: true },
  { provide: HookToken, useClass: GraphEventHookContribution, multi: true },
  { provide: HookToken, useClass: CommandContributionService, multi: true }
];
