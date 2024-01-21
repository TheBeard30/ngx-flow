import { IGraphCommandService } from '@/app/flow-core/interfaces/graph-command.interface';
import { IModelService } from '@/app/flow-core/interfaces/model.interface';
import { Disposable } from '../common/disposable';
import { KeybindingService } from '@/app/flow-core/services';

export interface IKeyBinding {
  /** keybinding的唯一标识  */
  id: string;
  /**
   * Unique command identifier of the command to be triggered by this keybinding.
   */
  command?: string;
  /**
   * 快捷键
   * https://craig.is/killing/mice
   * https://x6.antv.vision/zh/docs/api/graph/keyboard#bindkey
   */
  keybinding: string | string[];
  /**
   * 执行command时的参数
   */
  callback: ICmdExecutor;
}

export interface ICmdExecutor {
  (item: IKeyBinding, modelService: IModelService, cmd: IGraphCommandService, e: KeyboardEvent): Promise<void>;
}

export interface IRegisterKeybindingFunction {
  (registry: KeybindingService): Disposable;
}
