import { WORKOUTS_PATH } from '../../utils/Constants';
import { createFile, isPathExists } from '../../utils/fsUtils';
import { WorkoutSettings } from '../../utils/types';

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
  delta: number = 1,
) => {
  if (stateValue + delta > maxValue) {
    setter(maxValue);
    return;
  }
  setter(stateValue + delta);
};

export const onNumberDown = (
  setter: (n: number) => void,
  stateValue: number,
  minValue: number = 0,
  delta: number = 1,
) => {
  if (stateValue - delta < minValue) {
    setter(minValue);
    return;
  }
  setter(stateValue - delta);
};

export const onNumberChange = (
  newValue: number,
  setter: (n: number) => void,
  minValue: number = 0,
  maxValue: number = 100,
) => {
  if (newValue <= maxValue && newValue >= minValue) {
    setter(newValue);
  }
};

export const onNumberUpString = (
  setter: (n: string) => void,
  stateValue: string,
  maxValue: number = 100,
  delta: number = 1,
) => {
  const num = parseFloat(stateValue);
  if (num + delta > maxValue) {
    setter(`${maxValue}`);
    return;
  }
  console.log('s', num + delta);

  setter(`${(num + delta).toFixed(2)}`);
};

export const onNumberDownString = (
  setter: (n: string) => void,
  stateValue: string,
  minValue: number = 0,
  delta: number = 1,
) => {
  const num = parseFloat(stateValue);
  if (num - delta < minValue) {
    setter(`${minValue}`);
    return;
  }
  setter(`${(num - delta).toFixed(2)}`);
};

export const onNumberChangeString = (
  newValue: string,
  setter: (n: string) => void,
  minValue: number = 0,
  maxValue: number = 100,
) => {
  const num = parseFloat(newValue);
  if (num > maxValue) {
    setter(`${maxValue}`);
    return;
  }

  if (num < minValue) {
    setter(`${minValue}`);
    return;
  }

  if (num <= maxValue && num >= minValue) {
    setter(`${parseFloat(newValue).toFixed(2)}`);
  }
};

export const onValueChange = (
  setter: (n: number) => void,
  newValue: number,
  min?: number,
  max?: number,
) => {
  if (min && newValue < min) {
    setter(min);
    return;
  }

  if (max && newValue > max) {
    setter(max);
    return;
  }

  setter(newValue);
};

export const saveWorkout = async (
  settingsString: string,
  fileName: string,
) => {
  await createFile(
    `${WORKOUTS_PATH}/${fileName}.json`,
    settingsString,
  );
};

export const isWorkoutExists = async (name: string) =>
  await isPathExists(`${WORKOUTS_PATH}/${name}.json`);
