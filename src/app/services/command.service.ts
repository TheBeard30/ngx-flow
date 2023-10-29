import { Injectable } from '@angular/core';
import { IGraphCommandService } from '@/app/interfaces';
import { CmdContext, GraphLoadDataCommand, GraphRenderCommand } from '@/app/commands';

@Injectable({
  providedIn: 'root'
})
export class CommandService implements IGraphCommandService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function

  commandMap: Map<string, any> = new Map<string, any>();

  constructor(private ctx: CmdContext) {
    this.registerXFlowCommand();
  }

  executeCommand<Args, Result>(commandId: string, args: Args, hooks: any): Promise<void> {
    const command = this.commandMap.get(commandId);
    command.args = args;
    command.graph = this.ctx.getX6Graph();
    command.execute();
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
    const graphLoadDataCommand = new GraphLoadDataCommand();
    this.commandMap.set(graphLoadDataCommand.token, graphLoadDataCommand);
    const graphRenderCommand = new GraphRenderCommand();
    this.commandMap.set(graphRenderCommand.token, graphRenderCommand);
  }
}
