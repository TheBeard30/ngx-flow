import { Injectable } from '@angular/core';
import { IGraphCommandService } from '@/app/interfaces/graph-command.interface';

@Injectable({
  providedIn: 'root'
})
export class CommandService implements IGraphCommandService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() { }

  executeCommand<Args, Result>(commandId: string, args: Args, hooks: any): Promise<void> {
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
}
