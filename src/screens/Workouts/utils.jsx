export const onMinutesDown = (setter, stateValue, minValue = 0) => {
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

export const onMinutesUp = (setter, stateValue) => {
  if (stateValue >= 60 * 59) {
    setter(stateValue % 60);
    return;
  }
  setter(stateValue + 60);
};

export const onSecondsUp = (setter, stateValue) => {
  if (stateValue % 60 === 59) {
    setter(Math.floor(stateValue / 60));
    return;
  }
  setter(stateValue + 1);
};

export const onSecondsDown = (setter, stateValue, minValue = 0) => {
  if (stateValue === 0) {
    setter(59);
    return;
  }
  if (minValue > 0 && stateValue === minValue) {
    return;
  }
  setter(stateValue - 1);
};

export const onNumberUp = (setter, stateValue, maxValue = 100) => {
  if (stateValue === maxValue) {
    return;
  }
  setter(stateValue + 1);
};

export const onNumberDown = (setter, stateValue, minValue = 0) => {
  if (stateValue === minValue) {
    return;
  }
  setter(stateValue - 1);
};
