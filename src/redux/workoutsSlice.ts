import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WorkoutSimpleObject } from '../utils/types';
import Workout from '../workouts/Workout';

export const workoutSlice = createSlice({
  name: 'workouts',
  initialState: [] as WorkoutSimpleObject[],
  reducers: {
    setSavedWorkouts: (
      state,
      action: PayloadAction<WorkoutSimpleObject[]>,
    ) => [...state, ...action.payload],
    addToSavedWorkouts: (
      state,
      action: PayloadAction<WorkoutSimpleObject>,
    ) => {
      if (
        !state.find(
          (w: WorkoutSimpleObject) => w.name === action.payload.name,
        )
      ) {
        state.push(action.payload);
      }
    },
    deleteWorkout: (state, action: PayloadAction<string>) =>
      state.filter(
        (w: WorkoutSimpleObject) => w.name !== action.payload,
      ),
  },
});

export const {
  setSavedWorkouts,
  addToSavedWorkouts,
  deleteWorkout,
} = workoutSlice.actions;

export default workoutSlice.reducer;
