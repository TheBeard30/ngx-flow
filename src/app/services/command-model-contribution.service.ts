import { Injectable } from '@angular/core';
import { CommandService } from '@/app/services/command.service';
import { IModelService } from '@/app/interfaces/model.interface';

@Injectable({
  providedIn: 'root'
})
export class CommandModelContributionService {
  constructor(private command: CommandService) {}

  registerModel(registry: IModelService) {}
}
