export function debounce(cb: (...args: any[]) => void, time: number) {
  let flag: number;
  return () => {
    clearTimeout(flag);
    flag = window.setTimeout(cb, time);
  };
}

export function throttle(cb: (...args: any[]) => void) {
  let flag: number;
  return () => {
    if (!flag) {
      flag = requestAnimationFrame(() => {
        flag = null;
        cb();
      });
    }
  };
}
