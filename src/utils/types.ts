export enum ReactionModes {
  Counter = 'Counter',
  Timer = 'Timer',
  Actions = 'Actions',
}

export enum WorkoutPhase {
  Preparation = 'Preparation',
  Workout = 'Workout',
  Rest = 'Rest',
  Finish = 'Finish',
}

export enum WorkoutType {
  Interval = 'Interval',
  Counter = 'Counter',
  Reaction = 'Reaction',
  Any = 'Any',
}

export enum CountDirection {
  Up = 'Up',
  Down = 'Down',
}

export enum SettingsType {
  SOUND = 'sound',
  NUMBER = 'number',
  SECONDS = 'seconds',
}

type GeneralSettings = {
  type: WorkoutType;
  name: string;
  workout: number;
  rest: number;
  rounds: number;
};

export type WorkoutSimpleObject = { [key: string]: string };

export type IntervalSettings = GeneralSettings;

export type CounterSettings = {
  speed: number;
} & GeneralSettings;

export type ReactionSettings = {
  mode: ReactionModes;
  slowSpeed: number;
  fastSpeed: number;
  actionDuration: number;
} & GeneralSettings;

export type WorkoutSettings =
  | IntervalSettings
  | CounterSettings
  | ReactionSettings;
