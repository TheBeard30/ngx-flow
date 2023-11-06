export interface IModuleConfig<T = any> {
  CONFIG_TYPE: string;

  getConfig: () => Promise<T>;

  [K: string]: any;
}

export class ModelServiceConfig implements IModuleConfig {
  readonly CONFIG_TYPE = 'MODEL_SERVICE_CONFIG';

  private registerModelFn?: any;

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
