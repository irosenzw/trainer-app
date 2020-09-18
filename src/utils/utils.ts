export const isEmpty = (val: Object) =>
  !val || Object.keys(val).length === 0;

export const getValue = (obj: Object): any => obj?.value;

export const toMilliseconds = (num: number) => (num ? num * 1000 : 0);
