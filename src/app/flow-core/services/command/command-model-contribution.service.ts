import { Injectable } from '@angular/core';
import { CommandService } from '@/app/flow-core/services/command/command.service';
import { ModelService } from '@/app/flow-core/services/model/model.service';
import { COMMAND_GLOBALS, COMMAND_REDOABLE, COMMAND_UNDOABLE } from '@/app/flow-core/constants/model-constant';

@Injectable({
  providedIn: 'root'
})
export class CommandModelContributionService {
  constructor(private command: CommandService) {}

  registerModel(registry: ModelService) {
    registry.registerModel<COMMAND_REDOABLE.IState>({
      id: COMMAND_REDOABLE.id,
      getInitialValue: () => this.command.isRedoable,
      watchChange: async model => {
        return this.command.watchChange(() => {
          model.setValue(this.command.isRedoable);
        });
      }
    });

    registry.registerModel<COMMAND_UNDOABLE.IState>({
      id: COMMAND_UNDOABLE.id,
      getInitialValue: () => this.command.isUndoable,
      watchChange: async model => {
        return this.command.watchChange(() => {
          model.setValue(this.command.isUndoable);
        });
      }
    });
    registry.registerModel<COMMAND_GLOBALS.IState>({
      id: COMMAND_GLOBALS.id,
      modelFactory: () => {
        return this.command.Globals;
      }
    });
  }
}
