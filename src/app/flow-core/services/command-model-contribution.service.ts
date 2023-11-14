import { Injectable } from '@angular/core';
import { CommandService } from '@/app/flow-core/services/command.service';
import { IModelService } from '@/app/flow-core/interfaces/model.interface';

@Injectable({
  providedIn: 'root'
})
export class CommandModelContributionService {
  constructor(private command: CommandService) {}

  registerModel(registry: IModelService) {}
}
