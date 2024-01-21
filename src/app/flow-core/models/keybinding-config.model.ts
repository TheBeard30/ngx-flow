import { Disposable } from '@/app/flow-core/common/disposable';
import { IRegisterKeybindingFunction } from '@/app/flow-core/interfaces';
import { Deferred } from '@/app/flow-core/common/deferred';

const noop = () => Disposable.create(() => {});

export class KeybindingConfig {
  /** CONFIG_TYPE */
  readonly CONFIG_TYPE = 'KeybindingConfig';
  /** 外部注册context的方法 */
  private keybindingFunc: IRegisterKeybindingFunction = noop;

  /** 是否已加载 */
  private isMounted = new Deferred<boolean>();

  setMountState = () => {
    this.isMounted.resolve(true);
  };

  setKeybindingFunc = (fn: IRegisterKeybindingFunction) => {
    this.keybindingFunc = fn;
  };

  getConfig = async () => {
    await this.isMounted.promise;
    return {
      CONFIG_TYPE: this.CONFIG_TYPE,
      registerKeybindingFunc: this.keybindingFunc
    };
  };

  dispose = () => {
    this.keybindingFunc = noop;
    this.isMounted = new Deferred();
  };
}
