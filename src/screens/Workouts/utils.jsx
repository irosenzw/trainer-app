export const onMinutesDown = (setter, stateValue) => {
  if (stateValue < 60) {
    setter(stateValue + 60 * 59);
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

export const onSecondsDown = (setter, stateValue) => {
  if (stateValue === 0) {
    setter(59);
    return;
  }
  setter(stateValue - 1);
};
