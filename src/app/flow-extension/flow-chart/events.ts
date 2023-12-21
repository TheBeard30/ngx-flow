import { IGraphCommandService } from '@/app/flow-core/interfaces';
import { XFlowNodeCommands } from '@/app/flow-core/constants';

const setTransformData = (ele: HTMLElement, scale: number) => {
  const currentTransform = ele.getAttribute('transform');
  const transforms: (string | number)[] = currentTransform.split(',');
  transforms[0] = `matrix(${Number((transforms[0] as string).split('(')[1]) * scale}`;
  transforms[3] = Number(transforms[3]) * scale;
  ele.setAttribute('transform', transforms.join(','));
};
// 节点 ports 放大2被
export const setTransform = (elements: HTMLElement[]) => {
  if (!elements?.length) return;
  const scale = 2;
  elements.forEach(ele => {
    if (ele.getAttribute('data-scale')) return;
    setTransformData(ele, scale);
    ele.setAttribute('data-scale', `${scale}`);
  });
};
// 重置节点 scale
export const resetTransform = () => {
  const ports = document.getElementsByClassName('x6-port');
  if (!ports) {
    return;
  }
  Array.from(ports).forEach((ele: HTMLElement) => {
    const eleScale = ele.getAttribute('data-scale');
    if (eleScale) {
      setTransformData(ele, 1 / Number(eleScale));
      ele.removeAttribute('data-scale');
    }
  });
};

// 获取选中节点的 ports
export const getSelectedCellPorts = (eleId: string) => {
  const selectedPorts = document.getElementsByClassName('x6-node-selected');
  if (!selectedPorts) {
    return;
  }
  let matchPort = selectedPorts[0];
  Array.from(selectedPorts).forEach((ele: HTMLDivElement) => {
    if (ele.getAttribute('data-cell-id') === eleId) {
      matchPort = ele;
    }
  });
  return matchPort.getElementsByClassName('x6-port') as any;
};

/** 设置 ports visible */
export const changePortsVisible = (visible: boolean, e?: any, showPortsOnNodeSelected?: boolean) => {
  if (!visible) {
    resetTransform();
  }
  //设置port显示隐藏
  const containers = getContainer(e);
  // const graph = app.getGraphInstance().then((g)=>{console.log(g)});
  // const selectedCell = graph.getSelectedCells()?.[0]
  // // 节点选中并移入时，port transfrom scale * 2
  // if (selectedCell?.isNode() && showPortsOnNodeSelected) {
  //   setTransform(getSelectedCellPorts(selectedCell.id))
  // }
  Array.from(containers).forEach((container: HTMLDivElement) => {
    const ports = container.querySelectorAll('.x6-port-body') as NodeListOf<SVGAElement>;
    for (let i = 0, len = ports.length; i < len; i = i + 1) {
      ports[i].style.visibility = showPortsOnNodeSelected && visible ? 'visible' : 'hidden';
    }
  });
};
const getContainer = e => {
  let currentNode = e?.e?.currentTarget;
  if (!currentNode) {
    return document.getElementsByClassName('xflow-canvas-root');
  }
  let containter = null;
  while (!containter) {
    const current = currentNode.getElementsByClassName('xflow-canvas-root');
    if (current?.length > 0) {
      containter = current;
    }
    currentNode = currentNode.parentNode;
  }
  return containter;
};

export const resizeNode = async (e: any, cmd: IGraphCommandService) => {
  const { node } = e;
  if (!node) return;
  const nodeConfig = {
    id: node.id,
    ...node.data,
    ...node.getPosition(),
    ...node.size()
  };

  await cmd.executeCommand(XFlowNodeCommands.UPDATE_NODE.id, { nodeConfig });
};
