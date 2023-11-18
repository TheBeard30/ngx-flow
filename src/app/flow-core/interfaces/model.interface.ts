import { asyncScheduler, distinctUntilChanged, filter, Observable, throttleTime } from 'rxjs';
import { Token } from '@/app/flow-core/common/types';

export namespace NsModel {
  /** model的类型 */
  export interface IModel<T> {
    /** 传入一个回调函数来订阅model的变化 */
    watch: IWatch<T>;
    /** 更新model: 支持传值或者传入更新函数 */
    setValue: ISetValue<T>;
    /** 获取model的值 */
    getValue: () => T | EmptyType;
    /** 是否有非空的值 */
    hasValidValue: () => boolean;
    /** 通过Promise获取一个非空值 */
    getValidValue: () => Promise<T>;
  }
  /** 更新model的方法 */
  export interface ISetValue<T> {
    /** 直接设置一个新的值 */
    (value: T): void;
    /** 通过函数的参数获取state，并通过immer的方式来更新这个state */
    (producer: (s: any) => void): void;
  }
  /** 订阅model的方法 */
  export interface IWatch<T> {
    (
      /** onChange时会执行的回调 */
      cb: (value: T) => void,
      /** 可以对事件流进行的处理 */
      pipeFunction?: (observable: Observable<T | EmptyType>) => Observable<T>
    ): any;
  }

  /**
   * observable 空值，当作model ready的变量
   * 空值不会触发subscrition
   */
  export const EMPTY_VALUE = Symbol('EMPTY_MODEL_VALUE');
  /** Empty Value 类型 */
  export type EmptyType = typeof EMPTY_VALUE;
  /** 判断是否是空 */
  export function isValidValue<T>(val: unknown): val is T {
    return val !== EMPTY_VALUE;
  }

  /** 默认的对事件性能优化方法：只在value不同时才触发，同时增加throttle */
  export function defaultPipeFunction<T>(observable: Observable<T | EmptyType>) {
    return observable.pipe(
      distinctUntilChanged(),
      filter(item => isValidValue<T>(item)),
      throttleTime(17, asyncScheduler, { leading: false, trailing: true })
    ) as Observable<T>;
  }
}

/**
 * register Model 需要的Options
 */
export interface IModelOptions<T = any> {
  /** token */
  id: Token<T>;
  /** 模型的值 */
  modelFactory?: () => NsModel.IModel<T>;
  /** 模型的值 */
  getInitialValue?: () => T | null;
  /** 绑定模型的事件 */
  watchChange?: (self: NsModel.IModel<T>, modelService: IModelService) => Promise<any>;
}

export interface IModelService {
  /** 注册模型 */
  registerModel: <T>(options: IModelOptions<T>) => void;
  /** 异步获取模型：promise会在模型注册成功后resolve */
  awaitModel: <T = any>(token: Token<T>) => Promise<NsModel.IModel<T>>;
}
