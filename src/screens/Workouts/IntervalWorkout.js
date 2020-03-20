import React from 'react';
import { Text } from 'react-native';
import Wrapper from '../../Components/Wrapper';
import SmoothPicker from "react-native-smooth-picker";

const IntervalWorkout = ({ navigation }) => {

  const [chosen, changeChoiceTo] = React.useState(0)
  return (
    <Wrapper title='Interval Workout' backNav={() => navigation.navigate('Home')}>
      <SmoothPicker
        offsetSelection={40}
        magnet
        scrollAnimation
        data={Array.from({ length: 16 }, (_, i) => i)}
        onSelected={({ item, index }) => changeChoiceTo(index)}
        renderItem={({ item, index }) => (
          <Text style={{color: 'white'}}>{item}</Text>
        )}
      />
    </Wrapper>

  )
};

export default IntervalWorkout;