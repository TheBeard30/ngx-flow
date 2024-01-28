import { ModuleWithProviders, NgModule } from '@angular/core';
import { SharedModule } from '@/app/shared/shared.module';
import { XFlowCanvasComponent, XFlowComponent } from '@/app/flow-core/components';
import { Application } from '@/app/flow-core/models';
import {
  CommandService,
  GraphProviderService,
  HookService,
  KeybindingService,
  MenuService,
  ModelService
} from '@/app/flow-core/services';
import { CommandContributionService } from '@/app/flow-core/services/command/command-contribution.service';
import { CommandModelContributionService } from '@/app/flow-core/services/command/command-model-contribution.service';
import { RuntimeHookContribution } from '@/app/flow-core/hooks/contributions/runtime-hook-contribution';
import { GraphEventHookContribution } from '@/app/flow-core/hooks/contributions/graph-event-hook-contribution';
import { GraphModelContribution } from '@/app/flow-core/services/model/graph-model-contribution.service';

const COMPONENTS = [XFlowComponent, XFlowCanvasComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [SharedModule],
  exports: [...COMPONENTS]
})
export class FlowCoreModule {
  static forRoot(): ModuleWithProviders<FlowCoreModule> {
    const COMMAND_PROVIDERS = [CommandService, CommandContributionService, CommandModelContributionService];
    const HOOK_PROVIDERS = [HookService, RuntimeHookContribution, GraphEventHookContribution];
    const MODEL_PROVIDERS = [ModelService, GraphModelContribution];
    return {
      ngModule: FlowCoreModule,
      providers: [
        Application,
        GraphProviderService,
        ...COMMAND_PROVIDERS,
        ...HOOK_PROVIDERS,
        ...MODEL_PROVIDERS,
        KeybindingService,
        MenuService
      ]
    };
  }
}
