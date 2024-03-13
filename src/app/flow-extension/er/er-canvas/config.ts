import { createGraphConfig } from '@/app/flow-core/models';
import { merge } from 'lodash';
import { IEvent } from '@/app/flow-core/hooks/interface';
import { CellView, EdgeView, Shape } from '@antv/x6';
import { KeybindingConfig } from '@/app/flow-core/models/keybinding-config.model';
import { XFlowGraphCommands } from '@/app/flow-core/constants';
import { changePortsVisible } from '../event';

const defaultEdgeConfig = {
  attrs: {
    line: {
      stroke: '#A2B1C3',
      targetMarker: {
        name: 'block',
        width: 6,
        height: 6,
        open: true
      },
      sourceMarker: {
        name: 'circlePlus',
        r: 3
      },
      strokeWidth: 1
    }
  }
};

const TEMP_EGDE = 'er-connecting-edge';

const XFlowEdge = Shape.Edge.registry.register(
  'er-edge',
  Shape.Edge.define({
    zIndex: 99,
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
    },
  }),
  true
);

export const useGraphConfig = createGraphConfig((config, proxy) => {
  const { mode = 'edit', showPortsOnNodeSelected = false, edgeConfig = {}, injector } = proxy.getValue();
  config.setX6Config(
    merge({
      grid: true,
      history: true,
      panning: false,
      connecting: {
        router: 'er',
        connector: {
          name: 'rounded',
          args: {
            radius: 20
          }
        },
        anchor: 'left',
        connectionPoint: 'boundary',
        allowBlank: false,
        snap: {
          radius: 20
        },
        createEdge() {
          const tempEdge = new XFlowEdge({});
          console.log('tempEdge>>>', tempEdge);
          tempEdge.addTools([{
            name: 'popover',
          }])
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
        validateConnection({ sourceView, targetView, targetMagnet, sourceMagnet }) {
          // 不允许连接到自己
          if (sourceView === targetView) {
            return false;
          }
          const targetNode = targetView!.cell as any;
          // 判断目标链接桩是否可连接
          if (targetMagnet && sourceMagnet) {
            const targePortId = targetMagnet.getAttribute('port');
            const targePort = targetNode.getPort(targePortId);
            const sourcePortId = sourceMagnet.getAttribute('port');
            const sourcePort = targetNode.getPort(sourcePortId);
            //&& targePort.connected 新版X6不具有该属性
            return !(targePort && sourcePort && targePort.group === sourcePort.group);
          }
          return undefined;
        }
      },
      interacting: function (cellView: CellView) {
        if (cellView.cell.getPropByPath('unMovable')) {
          return { 'nodeMovable': false }
        }
        return true
      }
    })
  );
  config.setEvents([
    {
      eventName: 'node:selected',
      callback: () => {
        mode === 'edit' && changePortsVisible(false);
      }
    },
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
