import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreenBtn from '../Components/Buttons/HomeScreenBtn';
import Wrapper from '../Components/Wrapper';

const HomeScreen = ({ navigation }) => {
  return (
    <Wrapper title="Welcome">
      <View style={{ flexDirection: 'row' }}>
        <HomeScreenBtn
          text="Interval"
          action={() => navigation.navigate('IntervalWorkout')}
        />
        <HomeScreenBtn
          text="Counter"
          action={() => navigation.navigate('CounterWorkout')}
        />
      </View>
      <HomeScreenBtn text="Custom" />
      <Icon name="rocket" size={30} color="#AAA" />
    </Wrapper>
  );
};

// / color platte : https://coolors.co/011627-fdfffc-2ec4b6-e71d36-ff9f1c

export default HomeScreen;
