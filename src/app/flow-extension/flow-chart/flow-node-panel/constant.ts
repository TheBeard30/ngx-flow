export const PANEL_HEADER_HEIGHT = 40;
export const CONTAINER_CLASS = 'xflow-node-panel-collpase';
/** 组群 ID */
export const GROUP_NODE_RENDER_ID = 'GROUP_NODE_RENDER_ID';
// 节点默认尺寸
export const NODE_WIDTH = 60;
export const NODE_HEIGHT = 40;
// svg 绘制起始点，解决边不清晰的问题
export const NODE_PADDING = 1;

export const DefaultNodeConfig = {
  stroke: '#A2B1C3',
  fill: '#FFFFFF',
  fontFill: '#000',
  fontSize: 12,
  label: ''
};

export const NODE_POOL = [
  {
    name: 'Terminal',
    width: NODE_WIDTH,
    height: NODE_HEIGHT
  },
  {
    name: 'Process',
    width: NODE_WIDTH,
    height: NODE_HEIGHT
  },
  {
    name: 'Decision',
    width: NODE_WIDTH,
    height: NODE_HEIGHT
  },
  {
    name: 'MultiDocument',
    width: NODE_WIDTH,
    height: NODE_HEIGHT
  },
  {
    name: 'Connector',
    width: NODE_WIDTH,
    height: NODE_HEIGHT
  },
  {
    name: 'DataIO',
    ports: ['top', 'bottom'],
    width: NODE_WIDTH,
    height: NODE_HEIGHT
  },
  {
    name: 'Database',
    width: NODE_WIDTH,
    height: NODE_HEIGHT
  },
  {
    name: 'HardDisk',
    width: NODE_WIDTH,
    height: NODE_HEIGHT
  },
  {
    name: 'StroedData',
    width: NODE_WIDTH,
    height: NODE_HEIGHT
  },
  {
    name: 'Document',
    width: NODE_WIDTH,
    height: NODE_HEIGHT
  },
  {
    name: 'PredefinedProcess',
    width: NODE_WIDTH,
    height: NODE_HEIGHT
  },
  {
    name: 'Extract',
    width: NODE_WIDTH,
    height: NODE_HEIGHT
  },
  {
    name: 'Merge',
    width: NODE_WIDTH,
    height: NODE_HEIGHT
  },
  {
    name: 'Or',
    width: NODE_HEIGHT,
    height: NODE_HEIGHT
  },
  {
    name: 'ManualInput',
    width: NODE_WIDTH,
    height: NODE_HEIGHT
  },
  {
    name: 'Preparation',
    width: NODE_WIDTH,
    height: NODE_HEIGHT
  },
  {
    name: 'Delay',
    width: NODE_WIDTH,
    height: NODE_HEIGHT
  },
  {
    name: 'ManualOperation',
    width: NODE_WIDTH,
    height: NODE_HEIGHT
  },
  {
    name: 'Display',
    width: NODE_WIDTH,
    height: NODE_HEIGHT
  },
  {
    name: 'OffPageLink',
    width: NODE_WIDTH,
    height: NODE_HEIGHT
  },
  {
    name: 'NoteLeft',
    width: NODE_WIDTH,
    height: NODE_HEIGHT,
    label: '≣'
  },
  {
    name: 'NoteRight',
    label: '≣',
    width: NODE_WIDTH,
    height: NODE_HEIGHT
  },
  {
    name: 'InternalStorage',
    width: NODE_WIDTH,
    height: NODE_HEIGHT
  },
  {
    name: 'Text',
    label: 'text',
    width: NODE_WIDTH,
    height: NODE_HEIGHT
  }
];
// 缩放时保存同比例
export const ASPECTRATIONODE = ['Connector', 'Or'];
