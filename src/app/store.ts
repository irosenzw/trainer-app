import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from '../redux/settingsSlice';
import workoutsReducer from '../redux/workoutsSlice';

export default configureStore({
  reducer: {
    settings: settingsReducer,
    workouts: workoutsReducer,
  },
});
