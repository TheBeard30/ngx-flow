import { hookHubList as graphHooks } from '@/app/commands/graph';
import { CommandService } from '@/app/services/command.service';
import { Injectable, Injector } from '@angular/core';
import { CmdContext } from '@/app/commands';
import { GraphProviderService } from '@/app/services/graph-provider.service';
import { ModelService } from '@/app/services/model.service';

const list = [...graphHooks];

@Injectable({
  providedIn: 'root'
})
export class CommandContributionService {
  constructor(
    private commandService: CommandService,
    private injector: Injector
  ) {}

  onStart() {
    this.registerGraphCommands();
  }

  registerGraphCommands() {
    list.forEach(({ command }) => {
      this.commandService.registerCommand(command, {
        createCommand: (commandId: string, args: any) => {
          const graphProvider = this.injector.get(GraphProviderService);
          const modelService = this.injector.get(ModelService);
          const cmdContext = new CmdContext(graphProvider, modelService);
          cmdContext.setArgs(args);
          const instance = this.commandService.commandMap.get(commandId);
          instance.ctx = cmdContext;
          return instance;
        }
      });
    });
  }
}
