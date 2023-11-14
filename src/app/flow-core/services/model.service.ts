import { Injectable } from '@angular/core';
import { IModelOptions, IModelService, NsModel, Token } from '@/app/flow-core/interfaces/model.interface';
import { CommandModelContributionService } from '@/app/flow-core/services/command-model-contribution.service';
import { GraphModelContribution } from '@/app/flow-core/services/graph-model-contribution.service';
import { GraphProviderService } from '@/app/flow-core/services/graph-provider.service';

@Injectable({
  providedIn: 'root'
})
export class ModelService implements IModelService {
  constructor(
    private commandModelContribution: CommandModelContributionService,
    private graphModelContribution: GraphModelContribution,
    private graphProvider: GraphProviderService
  ) {}

  onStart() {
    this.commandModelContribution.registerModel(this);
    this.graphModelContribution.registerModel(this);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  registerModel<T>(options: IModelOptions<T>): void {}

  awaitModel<T>(token: Token<T>): Promise<NsModel.IModel<T>> {
    return Promise.resolve(undefined);
  }
}
