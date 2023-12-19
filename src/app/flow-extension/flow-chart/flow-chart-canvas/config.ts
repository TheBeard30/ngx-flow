import { createGraphConfig } from '@/app/flow-core/models';
import { merge } from 'lodash';
import { IEvent } from '@/app/flow-core/hooks/interface';
import { changePortsVisible } from '@/app/flow-extension/flow-chart/events';
import { NsUpdateNode } from '@/app/flow-core/commands';
import NODE_HEIGHT = NsUpdateNode.NODE_HEIGHT;
import NODE_WIDTH = NsUpdateNode.NODE_WIDTH;
import { ASPECTRATIONODE } from '@/app/flow-extension/flow-chart/flow-node-panel/constant';
import { setNodeRender } from '@/app/flow-extension/flow-chart/flow-node-panel/utils';

export const useGraphConfig = createGraphConfig((config, proxy) => {
  const { mode = 'edit', showPortsOnNodeSelected = false, edgeConfig = {} } = proxy.getValue();
  config.setX6Config(
    merge({
      grid: true,
      history: true,
      resizing: {
        enabled: true,
        minWidth: NODE_WIDTH,
        minHeight: NODE_HEIGHT,
        preserveAspectRatio: shape => {
          const { data } = shape;
          return ASPECTRATIONODE.includes(data.name);
        }
      },
      snapline: {
        enabled: true
      }
    })
  );
  setNodeRender(config);
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
        console.log('node:mouseenter>>>test');
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
      callback: (e, cmds) => {
        // resizeNode(e, cmds);
      }
    } as IEvent<'node:resized'>
  ]);
});
