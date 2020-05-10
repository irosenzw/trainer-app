export const onMinutesDown = (
  setter: (n: number) => void,
  stateValue: number,
  minValue: number = 0,
) => {
  if (stateValue < 60) {
    setter(stateValue + 60 * 59);
    return;
  }
  if (minValue > 0 && stateValue === 60) {
    setter(minValue);
    return;
  }
  setter(stateValue - 60);
};

export const onMinutesUp = (
  setter: (n: number) => void,
  stateValue: number,
) => {
  if (stateValue >= 60 * 59) {
    setter(stateValue % 60);
    return;
  }
  setter(stateValue + 60);
};

export const onSecondsUp = (
  setter: (n: number) => void,
  stateValue: number,
) => {
  if (stateValue % 60 === 59) {
    setter(Math.floor(stateValue / 60));
    return;
  }
  setter(stateValue + 1);
};

export const onSecondsDown = (
  setter: (n: number) => void,
  stateValue: number,
  minValue: number = 0,
) => {
  if (stateValue === 0) {
    setter(59);
    return;
  }
  if (minValue > 0 && stateValue === minValue) {
    return;
  }
  setter(stateValue - 1);
};

export const onNumberUp = (
  setter: (n: number) => void,
  stateValue: number,
  maxValue: number = 100,
) => {
  if (stateValue === maxValue) {
    return;
  }
  setter(stateValue + 1);
};

export const onNumberDown = (
  setter: (n: number) => void,
  stateValue: number,
  minValue: number = 0,
) => {
  if (stateValue === minValue) {
    return;
  }
  setter(stateValue - 1);
};
