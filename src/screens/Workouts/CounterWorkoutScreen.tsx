import React from 'react';
import Wrapper from '../../Components/Wrapper';
import ClockComponent from '../../Components/ClockComponent';
import NumberComponent from '../../Components/NumberComponent';
import {
  onNumberUp,
  onNumberDown,
  onNumberChange,
  saveWorkout,
} from './utils';
import StartButton from '../../Components/Buttons/StartButton';
import RangeSpeedComponent from '../../Components/RangeSpeedComponent';
import { CounterSettings, WorkoutType } from '../../utils/types';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { getValue } from '../../utils/utils';
import OverrideFileModal from '../../Components/Modals/OverrideFileModal';
import WorkoutNameInput from '../../Components/WorkoutNameInput';
import { isPathExists } from '../../utils/fsUtils';
import { WORKOUTS_PATH } from '../../utils/Constants';
import CounterWorkout from '../../workouts/CounterWorkout';

const minRounds = 1;
const maxRounds = 1000;
const minCountTo = 1;
const maxCountTo = 100;
const fastestSpeed = 200;
const slowestSpeed = 10000;

const CounterWorkoutScreen: React.FC<CounterProps> = ({
  navigation,
  route,
}) => {
  const loadWorkout: CounterWorkout = route.params?.loadWorkout;

  const counterSettings = useSelector(
    (state: any) => state.trainerState.Settings.counter,
    shallowEqual,
  );

  const dispatch = useDispatch();

  const {
    counterNum,
    counterRestTime,
    counterRounds,
    counterSpeed,
  } = counterSettings;

  const [countTo, setCountTo] = React.useState(
    parseInt(getValue(counterNum)),
  );
  const [speed, setSpeed] = React.useState(
    parseInt(getValue(counterSpeed)) * 1000,
  ); // convert to milliseconds
  const [restSecs, setRestSecs] = React.useState(
    parseInt(getValue(counterRestTime)),
  );
  const [rounds, setRounds] = React.useState(
    parseInt(getValue(counterRounds)),
  );

  React.useEffect(() => {
    if (loadWorkout) {
      setCountTo(loadWorkout.workoutTime as number);
      setRestSecs(loadWorkout.restTime as number);
      setRounds(loadWorkout.rounds as number);
      setSpeed(loadWorkout.speed as number);
    }
  }, [loadWorkout]);

  // CountTo
  const onCountToDown = React.useCallback(
    () => onNumberDown(setCountTo, countTo, minCountTo),
    [countTo],
  );

  const onCountToUp = React.useCallback(
    () => onNumberUp(setCountTo, countTo, maxCountTo),
    [countTo],
  );

  const onCountToChange = React.useCallback(
    (newValue) =>
      onNumberChange(newValue, setCountTo, minCountTo, maxCountTo),
    [countTo],
  );

  // Rounds
  const onRoundsDown = React.useCallback(
    () => onNumberDown(setRounds, rounds, minRounds),
    [rounds],
  );

  const onRoundsUp = React.useCallback(
    () => onNumberUp(setRounds, rounds, maxRounds),
    [rounds],
  );

  const onRoundsChange = React.useCallback(
    (newValue) =>
      onNumberChange(newValue, setRounds, minRounds, maxRounds),
    [rounds],
  );

  // Speed
  const onUpdateSpeed = React.useCallback((spd) => setSpeed(spd), [
    speed,
  ]);

  const [
    isNameInputVisiable,
    setIsNameInputVisiable,
  ] = React.useState(false);

  const [
    isOverrideModalVisiable,
    setIsOverrideModalVisiable,
  ] = React.useState(false);

  const [workoutName, setWorkoutName] = React.useState('');

  const saveWorkoutSettings = (workoutName: string) => {
    const ws = new CounterWorkout(
      workoutName,
      countTo,
      restSecs,
      rounds,
      speed,
    );

    saveWorkout(JSON.stringify(ws), ws.name as string)
      .then(() => {
        dispatch({ type: 'ADD_TO_SAVED_WORKOUTS', payload: ws });
        console.log('saved:', ws.name);
      })
      .catch((e) => console.log(e));
  };

  const isWorkoutExists = (workoutName: string) => {
    if (!workoutName) {
      return;
    }

    setWorkoutName(workoutName);
    isPathExists(`${WORKOUTS_PATH}/${workoutName}.json`)
      .then((result) =>
        result
          ? setIsOverrideModalVisiable(true)
          : saveWorkoutSettings(workoutName),
      )
      .catch((e) => console.log(e));
  };

  return (
    <Wrapper
      title="Counter"
      saveAction={() => setIsNameInputVisiable(true)}
      loadAction={() =>
        navigation.navigate('WorkoutPicker', {
          workoutType: WorkoutType.Counter,
          loadToScreen: 'Counter',
        })
      }
      hideLoadSaveBtns={false}
      navigation={navigation}
    >
      <OverrideFileModal
        isVisible={isOverrideModalVisiable}
        onClose={() => setIsOverrideModalVisiable(false)}
        onSave={() => {
          saveWorkoutSettings(workoutName);
          setIsOverrideModalVisiable(false);
        }}
      />
      {isNameInputVisiable && (
        <WorkoutNameInput onSubmit={isWorkoutExists} />
      )}
      <NumberComponent
        title="Count To"
        number={countTo}
        onUp={onCountToUp}
        onDown={onCountToDown}
        onChange={onCountToChange}
      />

      <ClockComponent
        title="Rest Time"
        seconds={restSecs}
        onSecondsChange={setRestSecs}
      />

      <NumberComponent
        title="Rounds"
        number={rounds}
        onUp={onRoundsUp}
        onDown={onRoundsDown}
        onChange={onRoundsChange}
      />

      <RangeSpeedComponent
        title="Speed (miliseconds)"
        minValue={fastestSpeed}
        maxValue={slowestSpeed}
        currFastSpeed={speed}
        onFastSpeedChange={onUpdateSpeed}
        rangeEnabled={false}
      />

      <StartButton
        onClick={() => {
          navigation.navigate('Action', {
            restTime: restSecs,
            workoutTime: countTo,
            workoutType: WorkoutType.Counter,
            speed,
            rounds,
          });
        }}
      />
    </Wrapper>
  );
};

type NavigationParams = {
  restTime: number;
  workoutTime: number;
  workoutType: string;
  speed: number;
  rounds: number;
};

type CounterProps = {
  navigation: any; // NavigationScreenProp<NavigationState, NavigationParams>;
  route: any;
};

export default CounterWorkoutScreen;
