import { Graph } from '@antv/x6';
import { IEvent } from '@/app/interfaces';

export class GraphConfig {
  readonly CONFIG_TYPE = 'GraphConfig';

  public xflowInstanceId: string;

  public graphId: string;

  private x6Options: Graph.Options;

  private appContainer: HTMLElement;

  private rootContainer: HTMLElement;

  private graphContainer: HTMLElement;

  private nodeRender = new Map();

  private edgeRender = new Map();

  private events: IEvent[] = [];

  constructor() {
    this.graphId = uuidv4();
  }
}

export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
