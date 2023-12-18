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
  // TODO 设置port显示隐藏
};
