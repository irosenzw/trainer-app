import React from 'react';
import { WORKOUTS_PATH } from '../utils/Constants';
import { listFileNames, readFile } from '../utils/fsUtils';
import { WorkoutSettings } from '../utils/types';

export const getAllSavedWorkouts = async () => {
  const workoutFileNames = await listFileNames(WORKOUTS_PATH);
  console.log('x:', workoutFileNames);
  const workouts: any[] | PromiseLike<any[]> = [];
  const readWorkoutPromises = workoutFileNames.map((workoutName) =>
    readFile(`${WORKOUTS_PATH}/${workoutName}`).then((res) =>
      workouts.push(res),
    ),
  );
  return Promise.all(readWorkoutPromises).then(() => workouts);
};
