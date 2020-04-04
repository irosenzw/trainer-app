import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Wrapper from '../../Components/Wrapper';
import ClockComponent from '../../Components/ClockComponent';
import {
  onMinutesDown,
  onMinutesUp,
  onSecondsUp,
  onSecondsDown,
} from './utils';

const IntervalWorkout = ({ navigation }) => {
  const [intervalSecs, setIntervalSecs] = React.useState(0);
  const [restSecs, setRestSecs] = React.useState(0);
  const [rounds, setRounds] = React.useState(1);

  const intervalOnMinuteUp = React.useCallback(
    () => onMinutesUp(setIntervalSecs, intervalSecs),
    [intervalSecs],
  );
  const intervalOnMinuteDown = React.useCallback(
    () => onMinutesDown(setIntervalSecs, intervalSecs),
    [intervalSecs],
  );
  const intervalOnSecondsUp = React.useCallback(
    () => onSecondsUp(setIntervalSecs, intervalSecs),
    [intervalSecs],
  );
  const intervalOnSecondsDown = React.useCallback(
    () => onSecondsDown(setIntervalSecs, intervalSecs),
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
    </Wrapper>
  );
};

export default IntervalWorkout;
