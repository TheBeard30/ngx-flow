import { Injectable } from '@angular/core';
import { IModelOptions, IModelService, NsModel } from '@/app/flow-core/interfaces/model.interface';
import { CommandModelContributionService } from '@/app/flow-core/services/command/command-model-contribution.service';
import { GraphModelContribution } from '@/app/flow-core/services/model/graph-model-contribution.service';
import { GraphProviderService } from '@/app/flow-core/services/graph-provider.service';
import { Token } from '@/app/flow-core/common/types';
import { RxModel } from '@/app/flow-core/common/rx-model';
import { Disposable, DisposableCollection } from '@/app/flow-core/common/disposable';
import { Deferred } from '@/app/flow-core/common/deferred';
import { ModelServiceConfig } from '@/app/flow-core/models/model-config.model';

@Injectable({
  providedIn: 'root'
})
export class ModelService implements IModelService {
  private deferredModelMap = new Map<Token<any>, Deferred<NsModel.IModel<any>>>();

  /** disposables */
  private toDispose = new DisposableCollection();

  modelConfig: ModelServiceConfig;

  constructor(
    private commandModelContribution: CommandModelContributionService,
    private graphModelContribution: GraphModelContribution,
    private graphProvider: GraphProviderService
  ) {
    this.modelConfig = new ModelServiceConfig();
    this.graphProvider.modelService = this;
  }

  onStart() {
    this.commandModelContribution.registerModel(this);
    this.graphModelContribution.registerModel(this);
    // this.registerRuntimeModel();
  }

  onStop() {
    this.toDispose.dispose();
  }

  registerModel<T>(options: IModelOptions<T>) {
    const { id, getInitialValue, modelFactory } = options;
    const toDispose = new DisposableCollection();

    const defer = this.ensureModel(id);
    if (defer.isResolved) {
      console.error(options, 'model has been registerd');
      return null;
    }
    const initialValue = getInitialValue ? getInitialValue() : NsModel.EMPTY_VALUE;
    const model = modelFactory ? modelFactory() : new RxModel<T>(initialValue);
    if (NsModel.isValidValue<T>(initialValue)) {
      defer.resolve(model);
    }
    if (options.watchChange) {
      options.watchChange(model, this).then(d => {
        if (!defer.isResolved) {
          defer.resolve(model);
        }
        this.toDispose.pushAll([d, toDispose]);
        toDispose.push(d);
      });
    }
    return toDispose;
  }

  findDeferredModel = <T = any>(token: Token<T>) => {
    return this.deferredModelMap.get(token);
  };

  awaitModel<T>(token: Token<T>): Promise<NsModel.IModel<T>> {
    const defer = this.ensureModel(token);
    return defer.promise as Promise<RxModel<T>>;
  }

  registerRuntimeModel = async () => {
    const { modelRegisterFunc } = await this.modelConfig.getConfig();
    const graphInstance = await this.graphProvider.getGraphInstance();

    if (modelRegisterFunc) {
      // @ts-ignore
      modelRegisterFunc(this, graphInstance);
    }
  };

  ensureModel = <T>(token: Token<T>) => {
    const existDeferred = this.deferredModelMap.get(token);
    if (existDeferred) {
      return existDeferred;
    }
    const deferred = new Deferred<RxModel>();
    this.deferredModelMap.set(token, deferred);
    this.toDispose.push(Disposable.create(() => this.deferredModelMap.delete(token)));
    return deferred;
  };

  setModelConfig(modelConfig: ModelServiceConfig) {
    this.modelConfig = modelConfig;
  }
}
