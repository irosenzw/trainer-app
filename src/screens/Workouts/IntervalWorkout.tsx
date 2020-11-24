import React from 'react';
import Wrapper from '../../Components/Wrapper';
import ClockComponent from '../../Components/ClockComponent';
import NumberComponent from '../../Components/NumberComponent';
import { onNumberUp, onNumberDown, onNumberChange } from './utils';
import StartButton from '../../Components/Buttons/StartButton';
import { WorkoutType } from '../../utils/types';
import { useSelector, shallowEqual } from 'react-redux';
import { getValue } from '../../utils/utils';
import WorkoutNameInput from '../../Components/workoutNameInput';

const intervalMinSec = 1;
const intervalMinRounds = 1;
const intervalMaxRounds = 1000;

const IntervalWorkout: React.FC<IntervalWorkoutProps> = ({
  navigation,
}) => {
  const intervalSettings = useSelector(
    (state: any) => state.trainerState.Settings.interval,
    shallowEqual,
  );

  const {
    intervalTime,
    intervalRestTime,
    intervalRounds,
  } = intervalSettings;

  const [intervalSecs, setIntervalSecs] = React.useState(
    parseInt(getValue(intervalTime)),
  );
  const [restSecs, setRestSecs] = React.useState(
    parseInt(getValue(intervalRestTime)),
  );
  const [rounds, setRounds] = React.useState(
    parseInt(getValue(intervalRounds)),
  );

  const onRoundsDown = React.useCallback(
    () => onNumberDown(setRounds, rounds, intervalMinRounds),
    [rounds],
  );

  const onRoundsUp = React.useCallback(
    () => onNumberUp(setRounds, rounds, intervalMaxRounds),
    [rounds],
  );

  const [
    isNameInputVisiable,
    setIsNameInputVisiable,
  ] = React.useState(false);

  const onRoundsChange = React.useCallback(
    (newValue) =>
      onNumberChange(
        newValue,
        setRounds,
        intervalMinRounds,
        intervalMaxRounds,
      ),
    [rounds],
  );

  return (
    <Wrapper
      title="Interval"
      saveAction={() => setIsNameInputVisiable(true)}
      hideLoadSaveBtns={false}
      navigation={navigation}
    >
      {isNameInputVisiable && (
        <WorkoutNameInput onSubmit={(x: string) => console.log(x)} />
      )}
      <ClockComponent
        title="Interval Time"
        seconds={intervalSecs}
        onSecondsChange={setIntervalSecs}
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
      <StartButton
        onClick={() => {
          navigation.navigate('Action', {
            restTime: restSecs,
            workoutTime: intervalSecs,
            workoutType: WorkoutType.Interval,
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
  rounds: number;
};

type IntervalWorkoutProps = {
  navigation: any; // NavigationScreenProp<NavigationState, NavigationParams>;
};

export default IntervalWorkout;
