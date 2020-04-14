import React from 'react';
import Wrapper from '../../Components/Wrapper';
import ClockComponent from '../../Components/ClockComponent';
import NumberComponent from '../../Components/NumberComponent';
import SpeedComponent from '../../Components/SpeedComponent';
import {
  onMinutesDown,
  onMinutesUp,
  onSecondsUp,
  onSecondsDown,
  onNumberUp,
  onNumberDown,
} from './utils';
import StartButton from '../../Components/Buttons/StartButton';

const minRounds = 1;
const maxRounds = 1000;
const minCountTo = 1;
const maxcountTo = 100;

const CounterWorkout = ({ navigation }) => {
  const [countTo, setCountTo] = React.useState(10);
  const [speed, setSpeed] = React.useState(1000); // milliseconds
  const [restSecs, setRestSecs] = React.useState(10);
  const [rounds, setRounds] = React.useState(minRounds);

  // CountTo
  const onCountToDown = React.useCallback(
    () => onNumberDown(setCountTo, countTo, minCountTo),
    [countTo],
  );

  const onCountToUp = React.useCallback(
    () => onNumberUp(setCountTo, countTo, maxcountTo),
    [countTo],
  );

  // Rest
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

  // Rounds
  const onRoundsDown = React.useCallback(
    () => onNumberDown(setRounds, rounds, minRounds),
    [rounds],
  );

  const onRoundsUp = React.useCallback(
    () => onNumberUp(setRounds, rounds, maxRounds),
    [rounds],
  );

  const onUpdateSpeed = React.useCallback((spd) => setSpeed(spd), [
    speed,
  ]);

  return (
    <Wrapper
      title="Counter Workout"
      backNav={() => navigation.navigate('Home')}
    >
      <NumberComponent
        title="Count To"
        number={countTo}
        onUp={onCountToUp}
        onDown={onCountToDown}
      />
      <NumberComponent
        title="Rounds"
        number={rounds}
        onUp={onRoundsUp}
        onDown={onRoundsDown}
      />
      <SpeedComponent title="Speed" updateSpeed={onUpdateSpeed} />
      <ClockComponent
        title="Rest Time"
        seconds={restSecs}
        onMinutesDown={restOnMinuteDown}
        onMinutesUp={restOnMinuteUp}
        onSecondsDown={restOnSecondsDown}
        onSecondsUp={restOnSecondsUp}
      />
      <StartButton />
    </Wrapper>
  );
};

export default CounterWorkout;
