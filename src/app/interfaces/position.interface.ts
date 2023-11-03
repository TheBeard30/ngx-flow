export interface IPosition {
  width?: number;
  height?: number;
  lineHeight?: number;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}

export const getPositionStyle = (position: IPosition = {}) => {
  const config = Object.entries(position);
  const style = config.length > 0 ? { position: 'absolute' } : {};
  config.forEach(([key, v = 0]) => {
    style[key] = `${v}px`;
  });
  return style;
};
