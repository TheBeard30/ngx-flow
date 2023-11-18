import { hookHubList as graphHooks } from '@/app/flow-core/commands/graph';
import { CommandService } from '@/app/flow-core/services/command.service';
import { Injectable, Injector } from '@angular/core';
import { CmdContext } from '@/app/flow-core/commands';
import { GraphProviderService } from '@/app/flow-core/services/graph-provider.service';
import { ModelService } from '@/app/flow-core/services/model.service';
import { IEvent, IHookContribution, IHookService } from '@/app/flow-core/hooks/interface';
import { ICmdHooks } from '@/app/flow-core/commands/interface';
import { HookHub } from '@/app/flow-core/hooks/hookhub';
import { HookService } from '@/app/flow-core/services/hook.service';

const hookHubList = [...graphHooks];

const defaultHookFactory = () => new HookHub();

@Injectable({
  providedIn: 'root'
})
export class CommandContributionService implements IHookContribution<ICmdHooks> {
  constructor(private injector: Injector) {}

  registerGraphCommands(registry: CommandService) {
    hookHubList.forEach(({ command }) => {
      registry.registerCommand(command, {
        createCommand: (commandId: string, args: any, hooks) => {
          const graphProvider = this.injector.get(GraphProviderService);
          const modelService = this.injector.get(ModelService);
          const hookService = this.injector.get(HookService);
          const cmdContext = new CmdContext(graphProvider, modelService, hookService);
          cmdContext.setArgs(args, hooks);
          const instance = registry.commandMap.get(commandId);
          instance.ctx = cmdContext;
          return instance;
        }
      });
    });
  }

  registerHook = async (hooks: ICmdHooks) => {
    hooks.x6Events.registerHook({
      name: 'bind group node move event',
      handler: async args => {
        const event: IEvent<'node:moving'> = {
          eventName: 'node:moving',
          callback: async ({ node }) => {
            const isGroup = node.prop('isGroup');
            if (isGroup) {
              node.prop('originPosition', node.getPosition());
              return;
            }
            // TODO 未完成
          }
        };
        args.push(event);
      }
    });
  };
  registerHookHub = async (registry: IHookService<ICmdHooks>) => {
    hookHubList.forEach(({ hookKey, createHook = defaultHookFactory }) => {
      registry.registerHookHub(hookKey, createHook());
    });
  };
}
