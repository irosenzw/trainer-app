import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreenBtn from '../Components/Buttons/HomeScreenBtn';
import Wrapper from '../Components/Wrapper';

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <Wrapper title="Train Me">
      <View style={{ flexDirection: 'row' }}>
        <HomeScreenBtn
          text="Interval"
          action={() => navigation.navigate('Interval')}
        />
        <HomeScreenBtn
          text="Counter"
          action={() => navigation.navigate('Counter')}
        />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <HomeScreenBtn
          text="Custom"
          action={() => navigation.navigate('Custom')}
        />
        <HomeScreenBtn
          text="Reaction"
          action={() => navigation.navigate('Reaction')}
        />
      </View>

      <Icon name="rocket" size={30} color="#AAA" />
    </Wrapper>
  );
};

// / color platte : https://coolors.co/011627-fdfffc-2ec4b6-e71d36-ff9f1c

type HomeScreenProps = {
  navigation: any;
};

export default HomeScreen;
