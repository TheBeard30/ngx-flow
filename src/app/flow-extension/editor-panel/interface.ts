import { NsGraph } from '@/app/flow-core/interfaces';

/** 画布选中会触发Form更新的画布元素类型 */
export type TargetType = 'node' | 'edge' | 'group' | 'canvas';
/** 画布元素的数据 */
export type TargetData = NsGraph.INodeConfig | NsGraph.IEdgeConfig | NsGraph.IGroupConfig | null;

/** ControlSchema name的类型 */
export type NamePath = string | number | (string | number)[];

/**  Form控件 shape的类型 */
export enum ControlShape {
  INPUT = 'input',
  CHECKBOX = 'checkbox',
  TEXTAREA = 'textArea',
  SELECT = 'select',
  DATETIME = 'datetime',
  FLOAT = 'float'
}

/** 下拉选项的配置 */
export interface IOption {
  title: string;
  value: string | number | boolean;
}

/** 依赖类型 */
export type UpdateReasonField = string | number | (string | number)[] | undefined; // 为 undefined 时说明这一项是一个函数，不明确依赖某个特殊字段

/** Form 字段id类型 */
export interface IDependency {
  /** 决定哪些字段变化时触发校验 */
  name: UpdateReasonField;
  /** match的条件 */
  condition: string | number | boolean | { (args: any): boolean }; // 条件值
  /** match后的control的值 */
  hidden?: boolean; // 是否被隐藏
  /** match后的control的值 */
  disabled?: boolean; // 是否被禁用
}

/** Form控件 */
export interface IControlSchema {
  /** form表单渲染的控件名 */
  label: string;
  /** form store中的字段名 */
  name: NamePath;
  /** controlmap中对应的 control id */
  shape: ControlShape | string;
  /** 默认值 */
  defaultValue?: string | number | boolean;
  /** 用户保存的值 */
  value?: string | number | boolean;
  /** 是否禁用输入，需要控件支持 */
  disabled?: boolean;
  /** 是否显示必选 */
  required?: boolean;
  /** label中问号的提示内容 */
  tooltip?: string;
  /** 控件后显示的文本 */
  extra?: string;
  /** 没有输入时控件的提示 */
  placeholder?: string;
  /** 隐藏 */
  hidden?: boolean;
  /** 下拉控件的选项 */
  options?: IOption[];
  /** 原始数据 */
  originData?: Record<string, any>;
  /** 控件联动的规则 */
  dependencies?: IDependency[];
  /** 表单校验规则 */
  rules?: any[];
}

/** Tab下的Group控件 */
export interface IGroup {
  name: string;
  tooltip?: string;
  controls: IControlSchema[];
}

/** Tab配置 */
export interface ITab {
  name: string;
  groups: IGroup[];
}

/** JSON Form Schema */
export interface ISchema {
  tabs: ITab[];
}
