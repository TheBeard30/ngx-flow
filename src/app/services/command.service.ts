import { Injectable, Injector } from '@angular/core';
import { IGraphCommand, IGraphCommandService } from '@/app/interfaces';
import { CmdContext, GraphLoadDataCommand, GraphRenderCommand, NsGraphRender } from '@/app/commands';
import command = NsGraphRender.command;

@Injectable({
  providedIn: 'root'
})
export class CommandService implements IGraphCommandService {
  protected readonly factories = new Map<string, any>();

  commandMap: Map<string, any> = new Map<string, any>();

  protected readonly commands = new Map<string, IGraphCommand>();

  constructor(private injector: Injector) {
    this.registerXFlowCommand();
  }

  async executeCommand<Args, Result>(commandId: string, args: Args, hooks: any): Promise<void> {
    const factory = this.getFactory(commandId);
    if (factory) {
      const cmdHandle = factory.createCommand(commandId, args);
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
    const graphLoadDataCommand = this.injector.get(GraphLoadDataCommand);
    this.commandMap.set(graphLoadDataCommand.token, graphLoadDataCommand);
    const graphRenderCommand = this.injector.get(GraphRenderCommand);
    this.commandMap.set(graphRenderCommand.token, graphRenderCommand);
  }

  registerCommand(command: IGraphCommand, factory: { createCommand: any }) {
    if (this.factories.has(command.id)) {
      console.warn(`A command ${command.id} is already register`);
      return;
    }
    this.doRegisterCommand(command);
    this.registerFactory(command.id, factory);
  }

  registerFactory(commandId: string, factory: any) {
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
    const factory = this.factories.get(commandId);
    return factory;
  }
}
