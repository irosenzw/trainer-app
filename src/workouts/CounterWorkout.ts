import { WorkoutType } from '../utils/types';
import Workout, { IWorkout } from './Workout';

class CounterWorkout extends Workout implements IWorkout {
  workoutTime: number | undefined;
  restTime: number | undefined;
  rounds: number | undefined;
  speed: string | undefined;

  constructor(
    name?: string,
    workoutTime?: number,
    restTime?: number,
    rounds?: number,
    speed?: string,
  ) {
    super(name, WorkoutType.Counter);
    this.workoutTime = workoutTime;
    this.restTime = restTime;
    this.rounds = rounds;
    this.speed = speed;
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
    this.speed = workoutObj.speed;
  };

  isValid = (): boolean =>
    !!this.name &&
    !!this.type &&
    !!this.workoutTime &&
    !!this.restTime &&
    !!this.rounds &&
    !!this.speed;
}

export default CounterWorkout;
