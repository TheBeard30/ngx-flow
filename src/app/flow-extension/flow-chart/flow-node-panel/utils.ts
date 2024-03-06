// 创建节点路径
import { isNumber } from 'lodash';
import { NsUpdateNode } from '@/app/flow-core/commands';
import NODE_WIDTH = NsUpdateNode.NODE_WIDTH;
import NODE_HEIGHT = NsUpdateNode.NODE_HEIGHT;
import { GROUP_NODE_RENDER_ID, NODE_POOL } from '@/app/flow-extension/flow-chart/flow-node-panel/constant';
import { GraphConfig, uuidv4 } from '@/app/flow-core/models';
import * as NodesComponent from './nodes';
import { GroupNodeComponent } from './group/group.node.component';
import { IRegisterNode } from './interface';

export const createPath = (paths: (string | number)[][], offsetX = 0, offsetY = 0) => {
  if (!paths?.length) {
    return null;
  }
  let path = '';
  // @ts-ignore
  paths.forEach((item: IPath) => {
    const [c, x, y, c2x, c2y] = item;
    path += isNumber(y) ? ` ${c} ${x + offsetX} ${y + offsetY}` : ` ${c}`;
    if (c2y) {
      path += ` ${c2x + offsetX} ${c2y + offsetY}`;
    }
  });

  return path;
};

/** 和 graph config 注册的节点保持一致 */
const getAnchorStyle = (position: string) => {
  return {
    position: { name: position },
    attrs: {
      circle: {
        r: 4,
        magnet: true,
        stroke: '#31d0c6',
        strokeWidth: 2,
        fill: '#fff',
        style: {
          visibility: 'hidden'
        }
      }
    },
    zIndex: 10
  };
};
//暂时添加export 供测试ernode使用
export const getPorts = (position = ['top', 'right', 'bottom', 'left']) => {
  return {
    items: position.map(name => {
      return { group: name, id: uuidv4() };
    }),
    groups: {
      top: getAnchorStyle('top'),
      right: getAnchorStyle('right'),
      bottom: getAnchorStyle('bottom'),
      left: getAnchorStyle('left')
    }
  };
};

export const getNodes = async nodes => {
  return [
    // @ts-ignore
    ...NODE_POOL.map(({ name, ports, width = NODE_WIDTH, height = NODE_HEIGHT, label = '' }) => {
      return {
        id: uuidv4(), // 不会被使用
        renderKey: name,
        name,
        label,
        popoverContent: () => name,
        width,
        height,
        ports: getPorts(ports)
      };
    })
  ];
};
export const setCustomNodeRender = (graphConfig: GraphConfig, registerNodes: IRegisterNode[]) => {

  let nodes = []
  registerNodes.forEach(item => {
    nodes = nodes.concat(
      item.nodes.map(node => ({
        ...node,
        parentKey: item.key,
      })),
    )
  })
  if (!graphConfig || !nodes?.length) {
    return
  }
  nodes.forEach(item => {
    const { name, component } = item
    graphConfig.setNodeRender(name, component)
  })
}

export const setNodeRender = (config: GraphConfig) => {
  if (!config.nodeRender.get('Terminal')) {
    NODE_POOL.map(v => {
      config.setNodeRender(v.name, NodesComponent[`${v.name}Node`]);
    });
  }
};

export const setGroupRender = config => {
  config.setNodeRender(GROUP_NODE_RENDER_ID, GroupNodeComponent)
}

