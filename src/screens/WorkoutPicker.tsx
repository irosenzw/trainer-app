import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { shallowEqual, useSelector } from 'react-redux';
import Collapsible from 'react-native-collapsible';
import { WorkoutSettings, WorkoutType } from '../utils/types';
import Wrapper from '../Components/Wrapper';
import { ListComponent } from '../Components/List/ListComponent';
import ListRowWithCheckBox from '../Components/WorkoutPickerRow';
import Workout, { IWorkout } from '../workouts/Workout';
import { COLOR_SCHEME } from '../utils/Constants';

type LoadWorkoutScreenProps = {
  route: any;
  navigation: any;
};

type WorkoutDetailsProps = {
  workoutSettings: IWorkout;
};

const WorkoutDetails: React.FC<WorkoutDetailsProps> = ({
  workoutSettings,
}) => {
  const stringedWorkout = workoutSettings.toStringedObj();
  return (
    <View>
      {Object.keys(stringedWorkout).map((setting) => {
        if (setting !== 'name') {
          return (
            <View key={`${stringedWorkout.name}-${setting}`}>
              <Text
                style={{ color: 'white', fontSize: 20 }}
              >{`${setting}: `}</Text>
              <Text
                style={{ color: 'white', fontSize: 15 }}
              >{`${stringedWorkout[setting]}`}</Text>
            </View>
          );
        }
      })}
    </View>
  );
};

const LoadWorkoutScreen: React.FC<LoadWorkoutScreenProps> = ({
  navigation,
  route,
}) => {
  const workoutType = route.params?.workoutType;
  const loadToScreen = route.params?.loadToScreen;
  const isTyped = workoutType && workoutType !== WorkoutType.Any;
  const [chosenWorkout, setChosenWorkout] = React.useState<
    Workout | undefined
  >(undefined);
  const savedWorkouts: Workout[] = useSelector(
    (state: any) => state.trainerState.savedWorkouts,
    shallowEqual,
  );

  let workouts = [...savedWorkouts];
  if (isTyped) {
    workouts = savedWorkouts.filter((ws) => ws.type === workoutType);
  }

  return (
    <Wrapper
      title="Workouts"
      navigation={navigation}
      customBtnText="Load"
      customBtnStyle={styles.loadBtn}
      customBtnAction={() =>
        navigation.navigate(loadToScreen || 'Interval', {
          loadWorkout: chosenWorkout as Workout,
        })
      }
      hideCustomBtn={!chosenWorkout}
    >
      <ListComponent>
        {workouts.map((workout) => (
          <ListRowWithCheckBox
            key={workout.name}
            title={workout.name as string}
            isChosen={chosenWorkout?.name === workout.name}
            onChecked={() => setChosenWorkout(workout)}
          >
            <WorkoutDetails workoutSettings={workout} />
          </ListRowWithCheckBox>
        ))}
      </ListComponent>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  loadBtn: {
    borderColor: COLOR_SCHEME.orange,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 40,
    borderRadius: 10,
    marginTop: 10,
  },
});

export default LoadWorkoutScreen;
