import { Injectable } from '@angular/core';
import { IModelOptions, IModelService, NsModel, Token } from '@/app/interfaces/model.interface';
import { CommandModelContributionService } from '@/app/services/command-model-contribution.service';
import { GraphModelContribution } from '@/app/services/graph-model-contribution.service';

@Injectable({
  providedIn: 'root'
})
export class ModelService implements IModelService {
  constructor(
    private commandModelContribution: CommandModelContributionService,
    private graphModelContribution: GraphModelContribution
  ) {}

  onStart() {
    this.commandModelContribution.registerModel(this);
    this.graphModelContribution.registerModel(this);
  }

  registerModel<T>(options: IModelOptions<T>): void {}

  awaitModel<T>(token: Token<T>): Promise<NsModel.IModel<T>> {
    return Promise.resolve(undefined);
  }
}
