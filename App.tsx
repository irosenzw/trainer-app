import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import IntervalWorkout from './src/screens/Workouts/IntervalWorkout';
import CounterWorkout from './src/screens/Workouts/CounterWorkout';
import ReactionWorkout from './src/screens/Workouts/ReactionWorkout';
import ActionScreen from './src/screens/ActionScreen';
import CustomWorkout from './src/screens/Workouts/CustomWorkout';

const Stack = createStackNavigator();

export default class App extends React.PureComponent {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" headerMode="none">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Interval" component={IntervalWorkout} />
          <Stack.Screen name="Counter" component={CounterWorkout} />
          <Stack.Screen name="Reaction" component={ReactionWorkout} />
          <Stack.Screen name="Action" component={ActionScreen} />
          <Stack.Screen name="Custom" component={CustomWorkout} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
