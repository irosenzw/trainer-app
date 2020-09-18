import { combineReducers } from 'redux';

const trainerState = (state = {}, action: any) => {
  switch (action.type) {
    case 'SET_SETTINGS':
      return { ...state, Settings: action.payload };
    default:
      return state;
  }
};

export default combineReducers({
  trainerState,
});
