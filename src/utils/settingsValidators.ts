// there are ints and floats
export const numberValidator = (
  numValue: number | string,
  isFloat: boolean = false,
  max: number,
  min: number,
) => {
  const num = isFloat
    ? parseFloat(numValue as string)
    : parseInt(numValue as string);
  if (num < min) {
    return min;
  }
  if (num > max) {
    return max;
  }

  return num;
};

export const stringValidator = (
  strValue: string,
  optionalValues: string[] = [],
) =>
  optionalValues.some((val) => val === strValue) ||
  optionalValues === []
    ? strValue
    : optionalValues[0];
