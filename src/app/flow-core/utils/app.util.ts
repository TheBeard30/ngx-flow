import { Application } from '@/app/flow-core/models';
import { Injector } from '@angular/core';
import { Cell, Edge, Node } from '@antv/x6';
import { IEdgeConfig, INodeConfig } from '@/app/flow-core/interfaces';

export const initApp = (injector: Injector) => {
  return injector.get(Application);
};

export const node2Json = (cell: Node) => {
  const children = cell.getChildren();
  const size = cell.getSize();
  const data = cell.getData<INodeConfig>() || ({} as INodeConfig);
  const position = cell.getPosition();
  const groupId = cell.getParentId();
  const { isCollapsed } = data;
  const groupCollapsedSize = data.groupCollapsedSize || (isCollapsed ? size : null);
  return {
    ...data,
    id: cell.id,
    width: size.width,
    height: size.height,
    x: position.x,
    y: position.y,
    group: groupId,
    groupChildren: children ? children.map(child => child.id) : null,
    groupCollapsedSize
  };
};

export const edge2Json = (cell: Edge) => {
  const data = cell.getData<any>() || {};
  return {
    ...data,
    id: cell.id,
    source: cell.getSourceCellId(),
    target: cell.getTargetCellId(),
    sourcePortId: cell.getSourcePortId(),
    targetPortId: cell.getTargetPortId(),
    sourcePort: cell.getSourcePortId(),
    targetPort: cell.getTargetPortId()
  };
};

export const cellsToJson = (cells: Cell<Cell.Properties>[]) => {
  const nodes: INodeConfig[] = [];
  const edges: IEdgeConfig[] = [];

  const cell2Json = (cell: Cell) => {
    if (cell.isNode()) {
      nodes.push(node2Json(cell));
    }
    if (cell.isEdge()) {
      edges.push(edge2Json(cell));
    }
  };
  cells.map(cell => {
    return cell2Json(cell);
  });

  return {
    nodes,
    edges
  };
};
