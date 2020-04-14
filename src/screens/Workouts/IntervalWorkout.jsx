import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import Wrapper from '../../Components/Wrapper';
import ClockComponent from '../../Components/ClockComponent';
import NumberComponent from '../../Components/NumberComponent';
import {
  onMinutesDown,
  onMinutesUp,
  onSecondsUp,
  onSecondsDown,
  onNumberUp,
  onNumberDown,
} from './utils';
import StartButton from '../../Components/Buttons/StartButton';

const intervalMinSec = 1;
const intervalMinRounds = 1;
const intervalMaxRounds = 1000;

const IntervalWorkout = ({ navigation }) => {
  const [intervalSecs, setIntervalSecs] = React.useState(20);
  const [restSecs, setRestSecs] = React.useState(10);
  const [rounds, setRounds] = React.useState(intervalMinRounds);

  const intervalOnMinuteUp = React.useCallback(
    () => onMinutesUp(setIntervalSecs, intervalSecs),
    [intervalSecs],
  );
  const intervalOnMinuteDown = React.useCallback(
    () =>
      onMinutesDown(setIntervalSecs, intervalSecs, intervalMinSec),
    [intervalSecs],
  );
  const intervalOnSecondsUp = React.useCallback(
    () => onSecondsUp(setIntervalSecs, intervalSecs),
    [intervalSecs],
  );
  const intervalOnSecondsDown = React.useCallback(
    () =>
      onSecondsDown(setIntervalSecs, intervalSecs, intervalMinSec),
    [intervalSecs],
  );

  const restOnMinuteUp = React.useCallback(
    () => onMinutesUp(setRestSecs, restSecs),
    [restSecs],
  );
  const restOnMinuteDown = React.useCallback(
    () => onMinutesDown(setRestSecs, restSecs),
    [restSecs],
  );
  const restOnSecondsUp = React.useCallback(
    () => onSecondsUp(setRestSecs, restSecs),
    [restSecs],
  );
  const restOnSecondsDown = React.useCallback(
    () => onSecondsDown(setRestSecs, restSecs),
    [restSecs],
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
      title="Interval Workout"
      backNav={() => navigation.navigate('Home')}
    >
      <ClockComponent
        title="Interval Time"
        seconds={intervalSecs}
        onMinutesDown={intervalOnMinuteDown}
        onMinutesUp={intervalOnMinuteUp}
        onSecondsDown={intervalOnSecondsDown}
        onSecondsUp={intervalOnSecondsUp}
      />
      <ClockComponent
        title="Rest Time"
        seconds={restSecs}
        onMinutesDown={restOnMinuteDown}
        onMinutesUp={restOnMinuteUp}
        onSecondsDown={restOnSecondsDown}
        onSecondsUp={restOnSecondsUp}
      />
      <NumberComponent
        title="Rounds"
        number={rounds}
        onUp={onRoundsUp}
        onDown={onRoundsDown}
      />
      <StartButton />
    </Wrapper>
  );
};

export default IntervalWorkout;
