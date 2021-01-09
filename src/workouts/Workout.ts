import { WorkoutType } from '../utils/types';

export interface IWorkout {
  isValid: () => boolean;
  fillFromJSON: (json: string) => void;
  toStringedObj: () => { [key: string]: string };
}

abstract class Workout implements IWorkout {
  name: string | undefined;
  type: WorkoutType | undefined;

  constructor(name?: string, type?: WorkoutType) {
    this.name = name;
    this.type = type;
  }

  isValid = () => false;
  fillFromJSON = (json: string) => {};
  toStringedObj = () => {
    return {};
  };
}

export default Workout;
