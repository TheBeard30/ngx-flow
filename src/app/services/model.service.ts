import { Injectable } from '@angular/core';
import { IModelOptions, IModelService, NsModel, Token } from '@/app/interfaces/model.interface';

@Injectable({
  providedIn: 'root'
})
export class ModelService implements IModelService {
  constructor() {}

  registerModel<T>(options: IModelOptions<T>): void {}

  awaitModel<T>(token: Token<T>): Promise<NsModel.IModel<T>> {
    return Promise.resolve(undefined);
  }
}
