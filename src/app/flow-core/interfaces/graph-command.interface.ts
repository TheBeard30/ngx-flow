import { InjectionToken } from '@angular/core';

export interface IGraphCommandService {
  watchChange: any;

  undoCommand: () => Promise<void>;

  redoCommand: () => Promise<void>;

  isRedoable: boolean;

  isUndoable: boolean;

  executeCommand: <Args = any, Result = any>(commandId: string, args: Args, hooks?: any) => Promise<void>;
}

export const CommandInjectionToken = new InjectionToken<IGraphCommandService>('command injection token');
