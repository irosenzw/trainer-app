import { WorkoutType } from '../utils/types';
import Workout, { IWorkout } from './Workout';

class IntervalWorkout extends Workout implements IWorkout {
  workoutTime: number | undefined;
  restTime: number | undefined;
  rounds: number | undefined;

  constructor(
    name?: string,
    workoutTime?: number,
    restTime?: number,
    rounds?: number,
  ) {
    super(name, WorkoutType.Interval);
    this.workoutTime = workoutTime;
    this.restTime = restTime;
    this.rounds = rounds;
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
  };

  isValid = (): boolean =>
    !!this.name &&
    !!this.type &&
    !!this.workoutTime &&
    !!this.restTime &&
    !!this.rounds;

  toStringedObj = (): { [key: string]: string } => {
    return {
      name: `${this.name}`,
      type: `${this.type}`,
      workoutTime: `${this.workoutTime}`,
      restTime: `${this.restTime}`,
      rounds: `${this.rounds}`,
    };
  };
}

export default IntervalWorkout;
