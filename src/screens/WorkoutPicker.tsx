import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Collapsible from 'react-native-collapsible';
import { WorkoutSettings, WorkoutType } from '../utils/types';
import Wrapper from '../Components/Wrapper';
import { ListComponent } from '../Components/List/ListComponent';
import ListRowWithCheckBox from '../Components/WorkoutPickerRow';
import Workout, { IWorkout } from '../workouts/Workout';
import { COLOR_SCHEME, WORKOUTS_PATH } from '../utils/Constants';
import { deleteFile } from '../utils/fsUtils';

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

  const dispatch = useDispatch();

  const savedWorkouts: Workout[] = useSelector(
    (state: any) => state.trainerState.savedWorkouts,
    shallowEqual,
  );

  const [workouts, setWorkouts] = React.useState(
    isTyped
      ? savedWorkouts.filter((ws) => ws.type === workoutType)
      : savedWorkouts,
  );

  const deleteWorkout = async (workoutName: string) => {
    await deleteFile(`${WORKOUTS_PATH}/${workoutName}.json`);
    dispatch({ type: 'DELETE_WORKOUT', payload: workoutName });
    setWorkouts(workouts.filter((w) => w.name !== workoutName));
  };

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
            onDelete={() => deleteWorkout(workout.name as string)}
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
