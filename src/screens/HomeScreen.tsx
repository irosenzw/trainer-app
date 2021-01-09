import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import HomeScreenBtn from '../Components/Buttons/HomeScreenBtn';
import Wrapper from '../Components/Wrapper';
import { getKey, storeObject } from '../storage/storage';
import { createWorkout, isEmpty } from '../utils/utils';
import { settings } from '../utils/default-settings';
import { setup } from '../utils/setup';
import { getAllSavedWorkouts } from '../storage/workouts';
import Workout from '../workouts/Workout';

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { navigate } = navigation;

  const trainerSettings = useSelector(
    (state: any) => state.trainerState.Settings,
    shallowEqual,
  );

  const savedWorkouts = useSelector(
    (state: any) => state.trainerState.savedWorkouts,
    shallowEqual,
  );

  setup();

  useEffect(() => {
    if (isEmpty(trainerSettings)) {
      getKey('Settings', true)
        .then((value) => {
          if (isEmpty(value)) {
            storeObject('Settings', settings); // Save default settings
            dispatch({ type: 'SET_SETTINGS', payload: settings });
          } else {
            dispatch({ type: 'SET_SETTINGS', payload: value });
          }
        })
        .catch((e) => console.log(e));
    }
  }, [trainerSettings]);

  useEffect(() => {
    if (savedWorkouts.length === 0) {
      getAllSavedWorkouts()
        .then((workouts) => {
          const validWorkouts: Workout[] = [];
          workouts.forEach((w) => {
            const workout = createWorkout(JSON.parse(w));
            if (workout.isValid()) {
              validWorkouts.push(workout);
            }
          });
          dispatch({
            type: 'SET_SAVED_WORKOUTS',
            payload: validWorkouts,
          });
        })
        .catch(() => null);
    }
  }, [savedWorkouts]);

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
