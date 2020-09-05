import { combineReducers } from 'redux';

const trainerState = (state = {}, action: any) => {
  switch (action.type) {
    case 'SET_SETTINGS':
      console.log('idodoroz', action.payload);
      return { ...state, Settings: action.payload };
    default:
      return state;
  }
};

export default combineReducers({
  trainerState,
});
