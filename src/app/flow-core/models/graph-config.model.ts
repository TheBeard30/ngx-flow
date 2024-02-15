import type { Graph as X6Graph } from '@antv/x6';
import { NsGraph } from '@/app/flow-core/interfaces';
import { MAX_ZOOM, MIN_ZOOM } from '@/app/flow-core/constants';

export class GraphConfig {
  readonly CONFIG_TYPE = 'GraphConfig';

  public xflowInstanceId: string;

  public graphId: string;

  private x6Options: X6Graph.Options;

  private appContainer: HTMLElement;

  private rootContainer: HTMLElement;

  private graphContainer: HTMLElement;

  public nodeRender = new Map<string, any>();

  private edgeRender = new Map<string, any>();

  private events: NsGraph.IEvent[] = [];

  constructor() {
    this.graphId = uuidv4();
  }

  setX6Config = (options?: X6Graph.Options) => {
    const defaultOptions = this.getDefaultGraphOptions();
    this.x6Options = { ...defaultOptions, ...options };
  };

  setAppContainer(element: HTMLElement) {
    this.appContainer = element;
  }

  setEvents = (events: NsGraph.IEvent[]) => {
    this.events = events;
  };

  setRootContainer(element: HTMLElement) {
    this.rootContainer = element;
  }

  setGraphContainer(element: HTMLElement) {
    this.graphContainer = element;
  }

  setNodeRender = (renderKey: string, component: any) => {
    this.nodeRender.set(renderKey, component);
  };

  private getDefaultGraphOptions = () => {
    const defaultOptions: X6Graph.Options = {
      // 节点是否可旋转
      rotating: false,
      // 节点是否可调整大小
      resizing: false,
      // 节点连线规则配置（详细文档：https://X6.antv.vision/zh/docs/api/graph/interaction#connecting）
      connecting: {
        snap: true,
        dangling: false,
        highlight: false,
        connectionPoint: 'rect',
        router: { name: 'er' },
        connector: {
          name: 'rounded',
          args: {
            radius: 15
          }
        }
      },
      // 画布背景，支持颜色/图片/水印等（详细文档：https://X6.antv.vision/zh/docs/tutorial/basic/background）
      background: {},
      // 网格配置（详细文档：https://X6.antv.vision/zh/docs/tutorial/basic/grid）
      grid: {
        visible: true
      },
      // 点选/框选配置（详细文档：https://X6.antv.vision/zh/docs/tutorial/basic/selection）
      selecting: {
        strict: true,
        enabled: true,
        multiple: true,
        selectCellOnMoved: true,
        showNodeSelectionBox: false,
        // 框选可以选中edge
        rubberEdge: true,
        // 框选可以选中node
        rubberNode: true,
        movable: true
      },
      // 对齐线配置，辅助移动节点排版（详细文档：https://X6.antv.vision/zh/docs/tutorial/basic/snapline）
      snapline: {
        enabled: false
      },
      // 撤销/重做能力（详细文档：https://X6.antv.vision/zh/docs/tutorial/basic/history）
      history: {
        enabled: false
      },
      // 剪切板，支持跨画布的复制/粘贴（详细文档：https://X6.antv.vision/zh/docs/tutorial/basic/clipboard）
      clipboard: {
        enabled: true,
        useLocalStorage: true
      },
      // 使画布具备滚动、平移、居中、缩放等能力（详细文档：https://X6.antv.vision/zh/docs/tutorial/basic/scroller）
      scroller: {
        enabled: false
      },
      // 滚轮缩放 （详细文档：https://X6.antv.vision/zh/docs/tutorial/basic/mousewheel）
      mousewheel: {
        enabled: true,
        minScale: MIN_ZOOM,
        maxScale: MAX_ZOOM,
        factor: 1.1,
        modifiers: ['ctrl', 'meta']
      },
      /** 普通画布, 支持拖拽平移 */
      panning: {
        enabled: true
      },
      /** 缩放参数 */
      scaling: {
        min: MIN_ZOOM,
        max: MAX_ZOOM
      },
      /** keyboard */
      keyboard: {
        enabled: true
      },
      /** 定制节点和边的交互行为 */
      interacting: {
        /** 节点默认可以被移动 */
        nodeMovable: true,
        /** 边上标签默认不可以被移动 */
        edgeLabelMovable: false
      },
      async: false
    } as any;
    return defaultOptions;
  };
}

export interface IValueProxy<T> {
  getValue: () => T;
}

/**
 * 创建图配置对象
 * @param {Function} addOptions  添加配置的回调方法
 */
export const createGraphConfig = <T = any>(addOptions: (config: GraphConfig, proxy: IValueProxy<T>) => void) => {
  return (props?: T) => {
    const graphConfig = new GraphConfig();
    const propsContainer = {
      getValue: () => props
    };
    addOptions(graphConfig, propsContainer);
    return graphConfig;
  };
};

export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
