import type { Attr } from '@antv/x6/lib/registry/attr';
import { PortManager } from '@antv/x6/es/model/port';
import { EventArgs, Graph } from '@antv/x6';

export namespace NsGraph {
  export interface IGraphMeta {
    /** 元数据，除了flowId之外，可能包括这些业务属性：画布名称/创建时间/更新时间/用户权限/画布 */
    flowId: string;
    /** 自定义字段 */
    [key: string]: any;
  }

  /** 图数据包括节点和边 */
  export interface IGraphData {
    /** 节点 */
    nodes: INodeConfig[];
    /** 边 */
    edges: IEdgeConfig[];
  }

  /** 节点信息 */
  export interface INodeConfig {
    /** 节点的唯一标识 */
    id: string;
    /** 节点在画布的位置: x */
    x?: number;
    /** 节点在画布的位置: y */
    y?: number;
    /** 节点的渲染宽度 */
    width?: number;
    /** 节点的渲染高度 */
    height?: number;
    /** 节点名 */
    label?: string;
    /** 节点React组件的key */
    renderKey?: string;
    /** 是否是Group */
    isGroup?: boolean;
    /** 所属群组 */
    group?: string;
    /** ports: 链接桩 */
    ports?: INodeAnchor[] | INodePortMeta;
    /** cell attrs */
    attrs?: Attr.CellAttrs;
    /** 用户自定义字段 */
    [key: string]: any;
  }

  /** 群组节点信息 */
  export interface IGroupConfig extends INodeConfig {
    /** 是否折叠 */
    isCollapsed?: boolean;
    /** group 折叠后的大小 */
    groupCollapsedSize?: { width: number; height: number };
    /** group 未折叠的大小 */
    groupChildrenSize?: { width: number; height: number };
    /** 子节点元素集合 */
    groupChildren?: string[];
    /** group Header */
    groupHeaderHeight?: number;
    /** group 内边距 */
    groupPadding?: number;
  }

  /** 边信息 */
  export interface IEdgeConfig {
    /** 边的唯一标识 */
    id: string;
    /** 边的上游节点id 和连接桩 */
    source: string;
    /** 边的下游节点id 和连接桩 */
    target: string;
    /** 边的上游节点的锚点Id */
    sourcePortId?: string;
    /** 边的下游节点的锚点Id */
    targetPortId?: string;
    /** 边上label */
    label?: string;
    /** 边上渲染React组件的key */
    renderKey?: string;
    /** 边上渲染内容的宽度 */
    edgeContentWidth?: number;
    /** 边上渲染内容的高度 */
    edgeContentHeight?: number;
    /** cell attrs */
    attrs?: Attr.CellAttrs;
    /** 用户自定义字段 */
    [key: string]: any;
  }

  /** 节点锚点配置信息 */
  export interface INodeAnchor extends Partial<PortManager.Port> {
    /** uuid */
    id: string;
    /** position enum NsGraph.AnchorGroup */
    group?: AnchorGroup | string;
    /** position enum NsGraph.AnchorType */
    type?: AnchorType;
    /** tooltip */
    tooltip?: string;
    /** 用户自定义字段 */
    [key: string]: any;
  }

  /** group + anchor的配置  */
  export interface INodePortMeta extends PortManager.Metadata {
    items: INodeAnchor[];
  }

  /** 节点锚点位置：上/下/左/右 */
  export enum AnchorGroup {
    TOP = 'top',
    BOTTOM = 'bottom',
    RIGHT = 'right',
    LEFT = 'left'
  }

  /** 锚点类型： 输入/输出 */
  export enum AnchorType {
    INPUT = 'input',
    OUTPUT = 'output'
  }

  export interface IEvent<K extends keyof EventArgs = any> {
    eventName: K;
    callback: (x6Event: EventArgs[K], commandService: any, modelService: any, graph: Graph) => void;
  }
}
