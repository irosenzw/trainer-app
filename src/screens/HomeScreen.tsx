import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import HomeScreenBtn from '../Components/Buttons/HomeScreenBtn';
import Wrapper from '../Components/Wrapper';
import { getKey, storeObject } from '../storage/storage';
import { isEmpty } from '../utils/utils';
import { settings } from '../utils/default-settings';

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [trainerSettings, setTrainerSettings] = React.useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEmpty(trainerSettings)) {
      getKey('Settings', true)
        .then((value) => {
          if (isEmpty(value)) {
            storeObject('Settings', settings); // Save default settings
            setTrainerSettings(settings); // Load default settings to state
            dispatch({ type: 'SET_SETTINGS', payload: settings });
          } else {
            setTrainerSettings(value); // Load saved settings to state
            dispatch({ type: 'SET_SETTINGS', payload: value });
          }
        })
        .catch((e) => console.log(e));
    }
  }, [trainerSettings]);

  const select = useSelector((state: any) => state);

  console.log('select: ', select);
  console.log(trainerSettings);

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
          text="Settings"
          action={() => navigation.navigate('Settings')}
        />
        <HomeScreenBtn
          text="Reaction"
          action={() => navigation.navigate('Reaction')}
        />
      </View>
    </Wrapper>
  );
};

// / color platte : https://coolors.co/011627-fdfffc-2ec4b6-e71d36-ff9f1c

type HomeScreenProps = {
  navigation: any;
};

export default HomeScreen;
