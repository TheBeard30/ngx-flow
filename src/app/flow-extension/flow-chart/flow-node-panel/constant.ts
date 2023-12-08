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
    name: 'Terminal'
  },
  {
    name: 'Process'
  },
  {
    name: 'Decision'
  },
  {
    name: 'MultiDocument'
  },
  {
    name: 'Connector',
  },
  {
    name: 'DataIO',
    //ports: ['top', 'bottom']
  },
  {
    name: 'Database'
  },
  {
    name: 'HardDisk'
  },
  {
    name: 'StroedData'
  },
  {
    name: 'Document'
  },
  {
    name: 'PredefinedProcess'
  },
  {
    name: 'Extract'
  },
  {
    name: 'Merge'
  },
  {
    name: 'Or',
    width: NODE_HEIGHT,
    height: NODE_HEIGHT
  },
  {
    name: 'ManualInput'
  },
  {
    name: 'Preparation'
  },
  {
    name: 'Delay'
  },
  {
    name: 'ManualOperation'
  },
  {
    name: 'Display'
  },
  {
    name: 'OffPageLink'
  },
  {
    name: 'NoteLeft',
    label: '≣'
  },
  {
    name: 'NoteRight',
    label: '≣'
  },
  {
    name: 'InternalStorage'
  },
  {
    name: 'Text',
    label: 'text'
  }
];
// 缩放时保存同比例
export const ASPECTRATIONODE = ['Connector', 'Or'];
