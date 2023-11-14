import { hookHubList as graphHooks } from '@/app/flow-core/commands/graph';
import { CommandService } from '@/app/flow-core/services/command.service';
import { Injectable, Injector } from '@angular/core';
import { CmdContext } from '@/app/flow-core/commands';
import { GraphProviderService } from '@/app/flow-core/services/graph-provider.service';
import { ModelService } from '@/app/flow-core/services/model.service';

const list = [...graphHooks];

@Injectable({
  providedIn: 'root'
})
export class CommandContributionService {
  constructor(private injector: Injector) {}

  registerGraphCommands(registry: CommandService) {
    list.forEach(({ command }) => {
      registry.registerCommand(command, {
        createCommand: (commandId: string, args: any) => {
          const graphProvider = this.injector.get(GraphProviderService);
          const modelService = this.injector.get(ModelService);
          const cmdContext = new CmdContext(graphProvider, modelService);
          cmdContext.setArgs(args);
          const instance = registry.commandMap.get(commandId);
          instance.ctx = cmdContext;
          return instance;
        }
      });
    });
  }
}
