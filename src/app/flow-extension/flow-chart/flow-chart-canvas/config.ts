import { createGraphConfig } from '@/app/flow-core/models';
import { merge } from 'lodash';
import { IEvent } from '@/app/flow-core/hooks/interface';
import { changePortsVisible, nodeChangePosition, resizeNode } from '@/app/flow-extension/flow-chart/events';
import { setGroupRender, setNodeRender } from '@/app/flow-extension/flow-chart/flow-node-panel/utils';
import { Shape } from '@antv/x6';
import { KeybindingConfig } from '@/app/flow-core/models/keybinding-config.model';
import { XFlowGraphCommands } from '@/app/flow-core/constants';
import { NsGraphCmd } from '@/app/flow-core/commands';

const defaultEdgeConfig = {
  attrs: {
    line: {
      stroke: '#A2B1C3',
      targetMarker: {
        name: 'block',
        width: 12,
        height: 8
      },
      strokeDasharray: '5 5',
      strokeWidth: 1
    }
  }
};

const TEMP_EGDE = 'flowchart-connecting-edge';

const XFlowEdge = Shape.Edge.registry.register(
  'xflow',
  Shape.Edge.define({
    zIndex: 1,
    highlight: true,
    name: TEMP_EGDE,
    label: '',
    anchor: {
      name: 'midSide',
      args: {
        dx: 10
      }
    },
    attrs: defaultEdgeConfig.attrs,
    data: {
      label: ''
    }
  }),
  true
);

export const useGraphConfig = createGraphConfig((config, proxy) => {
  const { mode = 'edit', showPortsOnNodeSelected = false, edgeConfig = {} } = proxy.getValue();
  config.setX6Config(
    merge({
      grid: true,
      history: true,
      connecting: {
        router: 'manhattan',
        connector: {
          name: 'rounded',
          args: {
            radius: 8
          }
        },
        anchor: 'center',
        connectionPoint: 'anchor',
        allowBlank: false,
        snap: {
          radius: 20
        },
        createEdge() {
          const tempEdge = new XFlowEdge({});
          console.log('tempEdge>>>', tempEdge);
          this.once('edge:connected', args => {
            console.log('tempEdge>>>', tempEdge);
            const { edge, isNew } = args;
            /** 没有edge:connected时，会导致graph.once的事件没有执行 */
            if (isNew && edge && edge.isEdge() && tempEdge === edge) {
              const targetNode = edge.getTargetCell();
              if (targetNode && targetNode.isNode()) {
                const targetPortId = edge.getTargetPortId();
                const sourcePortId = edge.getSourcePortId();
                const sourceCellId = edge.getSourceCellId();
                const targetCellId = edge.getTargetCellId();
                const customEdgeConfig = typeof edgeConfig === 'function' ? edgeConfig(edge) : edgeConfig;
                this.trigger('ADD_FLOWCHART_EDGE_CMD_EVENT', {
                  targetPortId,
                  sourcePortId,
                  source: sourceCellId,
                  target: targetCellId,
                  edge: edge,
                  tempEdgeId: tempEdge.id,
                  ...merge(defaultEdgeConfig, customEdgeConfig)
                });
              }
            }
          });
          return tempEdge;
        },
        validateEdge: args => {
          const { edge } = args;
          return !!(edge?.target as any)?.port;
        },
        // 是否触发交互事件
        validateMagnet() {
          // 所有锚点均可触发
          return true;
        },
        // 显示可用的链接桩
        validateConnection({ sourceView, targetView, targetMagnet }) {
          // 不允许连接到自己
          if (sourceView === targetView) {
            return false;
          }
          const node = targetView!.cell as any;
          // 判断目标链接桩是否可连接
          if (targetMagnet) {
            const portId = targetMagnet.getAttribute('port');
            const port = node.getPort(portId);
            return !(port && port.connected);
          }
          return undefined;
        }
      }
    })
  );
  setNodeRender(config);
  setGroupRender(config);
  config.setEvents([
    {
      eventName: 'node:selected',
      callback: () => {
        mode === 'edit' && changePortsVisible(false);
      }
    },
    {
      eventName: 'edge:dblclick',
      callback: e => {
        // addTools(e);
      }
    } as IEvent<'edge:dblclick'>,
    {
      eventName: 'edge:mouseleave',
      callback: (e, cmds) => {
        // removeTools(e, cmds);
      }
    } as IEvent<'edge:mouseleave'>,
    {
      eventName: 'node:mouseenter',
      callback: e => {
        mode === 'edit' && changePortsVisible(true, e, true);
      }
    } as IEvent<'node:mouseenter'>,
    {
      eventName: 'node:mouseleave',
      callback: e => {
        changePortsVisible(false, e);
      }
    } as IEvent<'node:mouseleave'>,
    {
      eventName: 'node:moved',
      callback: (e, cmds) => {
        // movedNode(e, cmds);
      }
    } as IEvent<'node:moved'>,
    {
      eventName: 'node:resized',
      callback: (e, cmd) => {
        resizeNode(e, cmd);
      }
    } as IEvent<'node:resized'>,
    {
      eventName: 'node:resizing',
      callback: (e, cmd) => {
        resizeNode(e, cmd);
      }
    } as IEvent<'node:resizing'>,
    {
      eventName: 'node:change:position',
      callback: e => {
        nodeChangePosition(e);
      }
    } as IEvent<'node:change:position'>
  ]);
});

export const useKeybindingConfig = (config: KeybindingConfig) => {
  config.setKeybindingFunc(registry => {
    return registry.registerKeybinding([
      {
        id: 'undo',
        keybinding: ['meta+z', 'ctrl+z'],
        callback: async function (item, ctx, cmd, e) {
          e.preventDefault();
          cmd.executeCommand(XFlowGraphCommands.GRAPH_HISTORY_UNDO.id, {});
        }
      },
      {
        id: 'redo',
        keybinding: ['meta+shift+z', 'ctrl+shift+z'],
        callback: async function (item, ctx, cmd, e) {
          e.preventDefault();
          cmd.executeCommand(XFlowGraphCommands.GRAPH_HISTORY_REDO.id, {});
        }
      }
    ]);
  });
  config.setMountState();
  return config;
};
