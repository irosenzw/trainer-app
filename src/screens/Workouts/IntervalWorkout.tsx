import React from 'react';
import Wrapper from '../../Components/Wrapper';
import ClockComponent from '../../Components/ClockComponent';
import NumberComponent from '../../Components/NumberComponent';
import { onNumberUp, onNumberDown } from './utils';
import StartButton from '../../Components/Buttons/StartButton';
import { WorkoutType } from '../../utils/types';

const intervalMinSec = 1;
const intervalMinRounds = 1;
const intervalMaxRounds = 1000;

const IntervalWorkout: React.FC<IntervalWorkoutProps> = ({
  navigation,
}) => {
  const [intervalSecs, setIntervalSecs] = React.useState(5);
  const [restSecs, setRestSecs] = React.useState(3);
  const [rounds, setRounds] = React.useState(intervalMinRounds);

  const onRoundsDown = React.useCallback(
    () => onNumberDown(setRounds, rounds, intervalMinRounds),
    [rounds],
  );

  const onRoundsUp = React.useCallback(
    () => onNumberUp(setRounds, rounds, intervalMaxRounds),
    [rounds],
  );

  return (
    <Wrapper title="Interval" backNav={() => navigation.goBack()}>
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
