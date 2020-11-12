import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import HomeScreenBtn from '../Components/Buttons/HomeScreenBtn';
import Wrapper from '../Components/Wrapper';
import { getKey, storeObject } from '../storage/storage';
import { isEmpty } from '../utils/utils';
import { settings } from '../utils/default-settings';
import { askForPremissions } from '../utils/askForPremissions';

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [trainerSettings, setTrainerSettings] = React.useState({});
  const dispatch = useDispatch();

  askForPremissions();

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

  return (
    <Wrapper title="Train Me" navigation={navigation} hideBackBtn={true}>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <HomeScreenBtn
          text="Interval"
          action={() => navigation.navigate('Interval')}
        />
        <HomeScreenBtn
          text="Counter"
          action={() => navigation.navigate('Counter')}
        />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <HomeScreenBtn
          text="Reaction"
          action={() => navigation.navigate('Reaction')}
        />
      </View>
    </Wrapper>
  );
};

// color platte : https://coolors.co/011627-fdfffc-2ec4b6-e71d36-ff9f1c

type HomeScreenProps = {
  navigation: any;
};

export default HomeScreen;
