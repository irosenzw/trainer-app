import { SettingsType } from './types';
export const settings: { [key: string]: any } = {
  // General
  general: {
    prepTime: {
      type: SettingsType.SECONDS,
      preview: 'Prepration time',
      value: 5,
    },
    startRoundSound: {
      type: SettingsType.SOUND,
      preview: 'Start round sound',
      value: 'boxingBell.mp3',
    },
    endRoundSound: {
      type: SettingsType.SOUND,
      preview: 'End round sound',
      value: 'kyai.mp3',
    },
  },
  interval: {
    // interval
    intervalTime: {
      type: SettingsType.SECONDS,
      preview: 'Workout time',
      value: 20,
    },
    intervalRestTime: {
      type: SettingsType.SECONDS,
      preview: 'Rest time',
      value: 10,
    },
    intervalRounds: {
      type: SettingsType.NUMBER,
      preview: 'Rounds',
      value: 1,
    },
    warningTime: {
      type: SettingsType.SECONDS,
      preview: 'Warning time',
      value: 3, // 0 for no warning
    },
    warningSound: {
      type: SettingsType.SOUND,
      preview: 'Warning sound',
      value: 'kyai.mp3',
    },
  },
  counter: {
    // counter
    counterNum: {
      type: SettingsType.NUMBER,
      preview: 'Count to',
      value: 10,
    },
    counterRestTime: {
      type: SettingsType.SECONDS,
      preview: 'Rest time',
      value: 5,
    },
    counterRounds: {
      type: SettingsType.NUMBER,
      preview: 'Rounds',
      value: 3,
    },
    counterSpeed: {
      type: SettingsType.SECONDS,
      preview: 'Speed',
      value: 1,
    },
  },
  // reaction
  reaction: {
    reactionActionsNum: {
      type: SettingsType.NUMBER,
      preview: 'Number of actions',
      value: 10,
    },
    reactionTimer: {
      type: SettingsType.SECONDS,
      preview: 'Workout time',
      value: 30,
    },
    reactionCounterNum: {
      type: SettingsType.NUMBER,
      preview: 'Count to',
      value: 10,
    },
    reactionRestTime: {
      type: SettingsType.SECONDS,
      preview: 'Rest time',
      value: 10,
    },
    reactionRounds: {
      type: SettingsType.NUMBER,
      preview: 'Rounds',
      value: 2,
    },
    timeBetweenActionsMin: {
      type: SettingsType.SECONDS,
      preview: 'Fast launch time',
      value: 1,
    },
    timeBetweenActionsMax: {
      type: SettingsType.SECONDS,
      preview: 'Slow launch time',
      value: 3,
    },
    actionDuration: {
      type: SettingsType.SECONDS,
      preview: 'Action Duration',
      value: 1,
    },
    reactionDefaultSound: {
      value: 'kyai.mp3',
      preview: 'Reaction sound',
      type: SettingsType.SOUND,
    },
  },
};
