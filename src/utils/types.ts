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
  workout: number;
  rest: number;
  rounds: number;
};

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

export type workoutSettings =
  | IntervalSettings
  | CounterSettings
  | ReactionSettings;
