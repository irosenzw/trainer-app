import { createAppContainer } from 'react-navigation';
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import HomeScreen from './src/screens/HomeScreen';
import IntervalWorkout from './src/screens/Workouts/IntervalWorkout';
import CounterWorkout from './src/screens/Workouts/CounterWorkout';
import ActionScreen from './src/screens/ActionScreen';
import Reducers from './src/Reducers';

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    IntervalWorkout,
    CounterWorkout,
    ActionScreen,
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  },
);

const Navigation = createAppContainer(navigator);

export default class App extends React.PureComponent {
  render() {
    return (
      <Provider store={createStore(Reducers)}>
        <Navigation />
      </Provider>
    );
  }
}