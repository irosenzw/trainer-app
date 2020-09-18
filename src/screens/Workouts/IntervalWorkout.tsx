import React from 'react';
import Wrapper from '../../Components/Wrapper';
import ClockComponent from '../../Components/ClockComponent';
import NumberComponent from '../../Components/NumberComponent';
import { onNumberUp, onNumberDown } from './utils';
import StartButton from '../../Components/Buttons/StartButton';
import { WorkoutType } from '../../utils/types';
import { useSelector, shallowEqual } from 'react-redux';
import { getValue } from '../../utils/utils';

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
    getValue(intervalTime),
  );
  const [restSecs, setRestSecs] = React.useState(
    getValue(intervalRestTime),
  );
  const [rounds, setRounds] = React.useState(
    getValue(intervalRounds),
  );

  const onRoundsDown = React.useCallback(
    () => onNumberDown(setRounds, rounds, intervalMinRounds),
    [rounds],
  );

  const onRoundsUp = React.useCallback(
    () => onNumberUp(setRounds, rounds, intervalMaxRounds),
    [rounds],
  );

  return (
    <Wrapper
      title="Interval"
      backNav={() => navigation.goBack()}
      navigation={navigation}
    >
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
