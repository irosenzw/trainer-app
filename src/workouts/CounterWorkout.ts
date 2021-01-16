import { WorkoutType } from '../utils/types';
import Workout, { IWorkout } from './Workout';

class CounterWorkout extends Workout implements IWorkout {
  workoutTime: number | undefined;
  restTime: number | undefined;
  rounds: number | undefined;
  speed: number | undefined;

  constructor(
    name?: string,
    workoutTime?: number,
    restTime?: number,
    rounds?: number,
    speed?: number,
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

  toStringedObj = (): { [key: string]: string } => {
    return {
      name: `${this.name}`,
      type: `${this.type}`,
      workoutTime: `${this.workoutTime}`,
      restTime: `${this.restTime}`,
      rounds: `${this.rounds}`,
      speed: `${this.speed}`,
    };
  };
}

export default CounterWorkout;
