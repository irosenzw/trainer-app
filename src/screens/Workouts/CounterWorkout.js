import React from 'react';
import Wrapper from '../../Components/Wrapper';

const CounterWorkout = ({ navigation }) => {
  return (
    <Wrapper title='Counter Workout' backNav={() => navigation.navigate('Home')}/>
  )
};

export default CounterWorkout;