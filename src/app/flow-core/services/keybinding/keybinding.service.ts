import { Inject, Injectable } from '@angular/core';
import { IKeyBinding } from '@/app/flow-core/interfaces';
import { Disposable, DisposableCollection } from '@/app/flow-core/common/disposable';
import { CommandService, GraphProviderService, ModelService } from '@/app/flow-core/services';
import { KeybindingConfig } from '@/app/flow-core/models/keybinding-config.model';

@Injectable({
  providedIn: 'root'
})
export class KeybindingService {
  private toDispose = new DisposableCollection();

  private keyBindingMap = new Map<string, IKeyBinding>();

  private enabledKeyBindingMap = new Map<string, Disposable>();

  private keybindingConfig: KeybindingConfig;

  constructor(
    private graphProvider: GraphProviderService,
    private commandService: CommandService,
    private modelService: ModelService
  ) {}

  onStart = async () => {
    this.registerExternalKeybindings();
  };

  onStop(): void {
    this.toDispose.dispose();
  }

  /** 注册用户定义在config中的keybinding */
  protected registerExternalKeybindings = () => {
    console.log(this.keybindingConfig);
    if (this.keybindingConfig) {
      this.keybindingConfig.getConfig().then(v => {
        const { registerKeybindingFunc } = v;
        return registerKeybindingFunc(this);
      });
    }
  };

  setKeybindingConfig(config: KeybindingConfig) {
    this.keybindingConfig = config;
  }

  registerKeybinding = (keybindings: IKeyBinding[] = []) => {
    const toDispose = new DisposableCollection();
    keybindings.forEach(keybinding => {
      /** 注册 Keybinding config */
      this.keyBindingMap.set(keybinding.id, keybinding);
      /** enable Keybinding */
      this.enableKeyBindings(keybinding.id).then(d => {
        toDispose.push(
          Disposable.create(() => {
            d.dispose();
            this.keyBindingMap.delete(keybinding.id);
          })
        );
      });
    });
    this.toDispose.push(toDispose);
    return toDispose;
  };

  /**
   * 启用keybinding, 用于触发command
   * @param keybindingId contextId
   */
  enableKeyBindings = async (keybindingId: string) => {
    /** 清理同样的键盘事件 */
    this.disableKeyBindings([keybindingId]);
    const keybinding = this.keyBindingMap.get(keybindingId);
    const graph = await this.graphProvider.getGraphInstance();

    const handler = this.runCommand(keybinding);
    graph.bindKey(keybinding.keybinding, handler);
    /** 注册disposable */
    const toDispose = Disposable.create(() => {
      graph.unbindKey(keybinding.keybinding);
      this.enabledKeyBindingMap.delete(keybinding.id);
    });
    /** 注册disposable */
    this.enabledKeyBindingMap.set(keybinding.id, toDispose);
    return toDispose;
  };

  /**
   * 禁用keybinding
   */
  disableKeyBindings = (ids: string[]) => {
    ids.forEach(id => {
      const disposable = this.enabledKeyBindingMap.get(id);
      if (disposable) {
        disposable.dispose();
      }
    });
  };

  /**
   * 执行command
   */
  protected runCommand = (keybinding: IKeyBinding) => async (e: KeyboardEvent) => {
    await keybinding.callback(keybinding, this.modelService, this.commandService, e);
  };
}
