import { Injectable, Injector } from '@angular/core';
import { ICommandFactory, IGraphCommand, IGraphCommandService } from '@/app/flow-core/interfaces';
import {
  AddNodeCommand,
  DeleteEdgeCommand,
  GraphLoadDataCommand,
  GraphRenderCommand,
  UpdateNodeCommand
} from '@/app/flow-core/commands';
import { CommandContributionService } from '@/app/flow-core/services/command-contribution.service';
import { AddEdgeCommand } from '@/app/flow-core/commands/edge/edge-add';
import { UpdateEdgeCommand } from '@/app/flow-core/commands/edge/edge-update';
import { SelectNodeCommand } from '@/app/flow-core/commands/node/node-select';
import { MoveNodeCommand } from '@/app/flow-core/commands/node/node-move';

@Injectable({
  providedIn: 'root'
})
export class CommandService implements IGraphCommandService {
  protected readonly factories = new Map<string, any>();

  commandMap: Map<string, any> = new Map<string, any>();

  protected readonly commands = new Map<string, IGraphCommand>();

  constructor(
    private injector: Injector,
    public commandContributionService: CommandContributionService
  ) {
    this.registerXFlowCommand();
  }

  onStart() {
    this.commandContributionService.registerGraphCommands(this);
  }

  async executeCommand<Args, Result>(commandId: string, args: Args, hooks?: any): Promise<void> {
    const factory = this.getFactory(commandId);
    if (factory) {
      const cmdHandle = factory.createCommand(commandId, args, hooks);
      cmdHandle.execute();
    }

    return Promise.resolve(undefined);
  }

  redoCommand(): Promise<void> {
    return Promise.resolve(undefined);
  }

  redoable: boolean;

  undoCommand(): Promise<void> {
    return Promise.resolve(undefined);
  }

  undoable: boolean;
  watchChange: any;

  registerXFlowCommand() {
    const commandList = [
      GraphLoadDataCommand,
      GraphRenderCommand,
      AddNodeCommand,
      UpdateNodeCommand,
      SelectNodeCommand,
      MoveNodeCommand,
      AddEdgeCommand,
      UpdateEdgeCommand,
      DeleteEdgeCommand,
      DeleteEdgeCommand
    ];
    for (const cls of commandList) {
      const command = this.injector.get(cls);
      this.commandMap.set(command.token, command);
    }
  }

  registerCommand(command: IGraphCommand, factory: ICommandFactory) {
    if (this.factories.has(command.id)) {
      console.warn(`A command ${command.id} is already register`);
      return;
    }
    this.doRegisterCommand(command);
    this.registerFactory(command.id, factory);
  }

  registerFactory(commandId: string, factory: ICommandFactory) {
    if (this.hasFactory(commandId)) {
      console.error('cannot register command:', commandId);
    }
    this.factories.set(commandId, factory);
  }

  doRegisterCommand(command: IGraphCommand) {
    this.commands.set(command.id, command);
  }

  /**
   * 检查commandId是否有Factory
   */
  hasFactory(commandId: string) {
    const factory = this.factories.get(commandId);
    return !!factory;
  }

  /**
   * Get a visible handler for the given command or `undefined`.
   */
  getFactory(commandId: string) {
    return this.factories.get(commandId);
  }
}
