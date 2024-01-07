import { NodeWidget } from '@/app/flow-extension/editor-panel/components/node.widget';
import { EdgeWidget } from '@/app/flow-extension/editor-panel/components/edge.widget';
import { CanvasWidget } from '@/app/flow-extension/editor-panel/components/canvas.widget';

export * from './node.widget';
export * from './edge.widget';
export * from './canvas.widget';

export const defaultControlMap = (controlMap: Map<string, any>) => {
  controlMap.set('node-service', NodeWidget);
  controlMap.set('edge-service', EdgeWidget);
  controlMap.set('canvas-service', CanvasWidget);
  return controlMap;
};
