import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { WorkoutType } from '../utils/types';
import Wrapper from '../Components/Wrapper';
import { ListComponent } from '../Components/List/ListComponent';
import ListRowWithCheckBox from '../Components/WorkoutPickerRow';
import Workout, { IWorkout } from '../workouts/Workout';
import { COLOR_SCHEME, WORKOUTS_PATH } from '../utils/Constants';
import { deleteFile } from '../utils/fsUtils';
import { toClockView } from '../utils/utils';

type LoadWorkoutScreenProps = {
  route: any;
  navigation: any;
};

type WorkoutDetailsProps = {
  workoutSettings: IWorkout;
};

const settingsLabel = (setting: string): string => {
  switch (setting) {
    case 'workoutTime':
      return 'Workout';
    case 'restTime':
      return 'Rest';
    case 'rounds':
      return 'Rounds';
    case 'mode':
      return 'Mode';
    case 'speed':
      return 'Speed';
    case 'slowSpeed':
      return 'Slow Speed';
    case 'fastSpeed':
      return 'Fast Speed';
    default:
      return setting;
  }
};

const valueLabel = (
  setting: string,
  value: string | number,
): string => {
  if (setting === 'workoutTime' || setting === 'restTime') {
    return toClockView(value as number);
  }

  if (
    setting === 'speed' ||
    setting === 'slowSpeed' ||
    setting === 'fastSpeed'
  ) {
    return `${value}s`;
  }

  return `${value}`;
};

const WorkoutDetails: React.FC<WorkoutDetailsProps> = ({
  workoutSettings,
}) => {
  const stringedWorkout = workoutSettings.toStringedObj();
  return (
    <View style={styles.detailsView}>
      {Object.keys(stringedWorkout).map((setting) => {
        if (
          setting !== 'name' &&
          setting !== 'type' &&
          setting !== 'sounds'
        ) {
          return (
            <View
              key={`${stringedWorkout.name}-${setting}`}
              style={styles.rowDetail}
            >
              <View style={styles.setting}>
                <Text style={{ color: 'white', fontSize: 20 }}>
                  {`${settingsLabel(setting)}: `}
                </Text>
              </View>
              <View style={styles.value}>
                <Text style={{ color: 'white', fontSize: 20 }}>
                  {valueLabel(setting, stringedWorkout[setting])}
                </Text>
              </View>
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
  detailsView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  rowDetail: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 5,
  },
  setting: {
    flex: 1,
  },
  value: {
    flex: 1,
  },
});

export default LoadWorkoutScreen;
