import { combineReducers } from 'redux';
import Workout from '../workouts/Workout';

const initalState = { Settings: {}, savedWorkouts: [] };

const trainerState = (state = initalState, action: any) => {
  switch (action.type) {
    case 'SET_SETTINGS':
      return { ...state, Settings: action.payload };
    case 'SET_SAVED_WORKOUTS':
      return { ...state, savedWorkouts: action.payload };
    case 'ADD_TO_SAVED_WORKOUTS':
      return {
        ...state,
        savedWorkouts: [...state.savedWorkouts, action.payload],
      };
    case 'DELETE_WORKOUT':
      return {
        ...state,
        savedWorkouts: state.savedWorkouts.filter(
          (w: Workout) => w.name !== action.payload,
        ),
      };
    default:
      return state;
  }
};

export default combineReducers({
  trainerState,
});
