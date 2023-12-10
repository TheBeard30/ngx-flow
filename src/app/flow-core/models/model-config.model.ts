import { Disposable } from '@/app/flow-core/common/disposable';

export interface IModuleConfig<T = any> {
  CONFIG_TYPE: string;

  getConfig: () => Promise<T>;

  [K: string]: any;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const disposableNoop = () => Disposable.create(() => {});
export class ModelServiceConfig implements IModuleConfig {
  readonly CONFIG_TYPE = 'MODEL_SERVICE_CONFIG';

  public registerModelFn? = disposableNoop;

  registerModel = registerModel => {
    this.registerModelFn = registerModel;
  };

  getConfig() {
    return Promise.resolve({
      CONFIG_TYPE: this.CONFIG_TYPE,
      modelRegisterFunc: this.registerModelFn
    });
  }
}
