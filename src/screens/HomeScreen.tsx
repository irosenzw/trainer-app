import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import HomeScreenBtn from '../Components/Buttons/HomeScreenBtn';
import Wrapper from '../Components/Wrapper';
import { getKey, storeObject } from '../storage/storage';
import { isEmpty } from '../utils/utils';
import { settings } from '../utils/default-settings';
import { setup } from '../utils/setup';

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [trainerSettings, setTrainerSettings] = React.useState({});
  const dispatch = useDispatch();
  const { navigate } = navigation;

  setup();

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
    <Wrapper title="Train Me" navigation={navigation}>
      <View style={styles.btnContainer}>
        <HomeScreenBtn
          text="Interval"
          action={() => navigate('Interval')}
        />
        <HomeScreenBtn
          text="Counter"
          action={() => navigate('Counter')}
        />
      </View>
      <View style={styles.btnContainer}>
        <HomeScreenBtn
          text="Reaction"
          action={() => navigate('Reaction')}
        />
      </View>
    </Wrapper>
  );
};

// color platte : https://coolors.co/011627-fdfffc-2ec4b6-e71d36-ff9f1c

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

type HomeScreenProps = {
  navigation: any;
};

export default HomeScreen;
