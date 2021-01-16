import { ReactionModes, WorkoutType } from '../utils/types';
import Workout, { IWorkout } from './Workout';

class ReactionWorkout extends Workout implements IWorkout {
  workoutTime: number | undefined;
  restTime: number | undefined;
  rounds: number | undefined;
  mode: ReactionModes | undefined;
  slowSpeed: number | undefined;
  fastSpeed: number | undefined;
  actionDuration: number | undefined;

  constructor(
    name?: string,
    workoutTime?: number,
    restTime?: number,
    rounds?: number,
    mode?: ReactionModes,
    slowSpeed?: number,
    fastSpeed?: number,
    actionDuration?: number,
  ) {
    super(name, WorkoutType.Reaction);
    this.workoutTime = workoutTime;
    this.restTime = restTime;
    this.rounds = rounds;
    this.mode = mode;
    this.slowSpeed = slowSpeed;
    this.fastSpeed = fastSpeed;
    this.actionDuration = actionDuration;
  }

  fillFromJSON = (json: string) => {
    let workoutObj;
    try {
      workoutObj = JSON.parse(json);
    } catch {
      return;
    }

    this.name = workoutObj.name;
    this.type = workoutObj.type;
    this.workoutTime = workoutObj.workoutTime;
    this.restTime = workoutObj.restTime;
    this.rounds = workoutObj.rounds;
    this.mode = workoutObj.mode;
    this.slowSpeed = workoutObj.slowSpeed;
    this.fastSpeed = workoutObj.fastSpeed;
    this.actionDuration = workoutObj.actionDuration;
  };

  isValid = () =>
    !!this.name &&
    !!this.type &&
    !!this.workoutTime &&
    !!this.restTime &&
    !!this.rounds &&
    !!this.mode &&
    !!this.slowSpeed &&
    !!this.fastSpeed &&
    !!this.actionDuration;

  toStringedObj = (): { [key: string]: string } => {
    return {
      name: `${this.name}`,
      type: `${this.type}`,
      workoutTime: `${this.workoutTime}`,
      restTime: `${this.restTime}`,
      rounds: `${this.rounds}`,
      mode: `${this.mode}`,
      slowSpeed: `${this.slowSpeed}`,
      fastSpeed: `${this.fastSpeed}`,
      actionDuration: `${this.actionDuration}`,
    };
  };
}

export default ReactionWorkout;
