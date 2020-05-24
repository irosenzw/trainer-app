import React from 'react';
import Wrapper from '../../Components/Wrapper';
import ClockComponent from '../../Components/ClockComponent';
import NumberComponent from '../../Components/NumberComponent';
import SpeedComponent from '../../Components/ButtonGroupComponent';
import {
  onMinutesDown,
  onMinutesUp,
  onSecondsUp,
  onSecondsDown,
  onNumberUp,
  onNumberDown,
  onValueChange,
} from './utils';
import StartButton from '../../Components/Buttons/StartButton';
import { REACTION } from '../../utils/Constants';
import TimeRangeSlider from '../../Components/WorkoutRangeSlider';
import RangeSpeedComponent from '../../Components/RangeSpeedComponent';

const minRounds = 1;
const maxRounds = 1000;
const minCountTo = 1;
const maxcountTo = 100;
const fastestValue = 200; // miliseconds - 0.2 seconds
const slowestValue = 10000; // miliseconds - 10 seconds

const ReactionWorkout: React.FC<CounterProps> = ({ navigation }) => {
  const [actions, setActions] = React.useState(10);
  const [restSecs, setRestSecs] = React.useState(10);
  const [rounds, setRounds] = React.useState(minRounds);
  const [currFastSpeed, setCurrFastSpeed] = React.useState(1000);
  const [currSlowSpeed, setCurrSlowSpeed] = React.useState(5000);
  const [currActionDur, setCurrActionDur] = React.useState(1000);

  // Actions
  const onActionDown = React.useCallback(
    () => onNumberDown(setActions, actions, minCountTo),
    [actions],
  );

  const onActionUp = React.useCallback(
    () => onNumberUp(setActions, actions, maxcountTo),
    [actions],
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

  // Action Duration
  const onActionDurtionChange = React.useCallback(
    (newValue) => onValueChange(setCurrActionDur, newValue),
    [currActionDur],
  );

  // Time Between Actions
  const onFastSpeedChange = React.useCallback(
    (newValue) =>
      onValueChange(
        setCurrFastSpeed,
        newValue,
        fastestValue,
        currSlowSpeed - 50,
      ),
    [currFastSpeed],
  );

  const onSlowSpeedChange = React.useCallback(
    (newValue) =>
      onValueChange(
        setCurrSlowSpeed,
        newValue,
        currFastSpeed + 50,
        slowestValue,
      ),
    [currSlowSpeed],
  );

  return (
    <Wrapper
      title="Reaction"
      backNav={() => navigation.navigate('Home')}
    >
      <NumberComponent
        title="Actions"
        number={actions}
        onUp={onActionUp}
        onDown={onActionDown}
      />
      <NumberComponent
        title="Rounds"
        number={rounds}
        onUp={onRoundsUp}
        onDown={onRoundsDown}
      />

      <RangeSpeedComponent
        title="Action Duration"
        minValue={0}
        maxValue={slowestValue}
        currFastSpeed={currActionDur}
        onFastSpeedChange={onActionDurtionChange}
        rangeEnabled={false}
      />

      <RangeSpeedComponent
        title="Time Between Actions"
        minValue={fastestValue}
        maxValue={slowestValue}
        currFastSpeed={currFastSpeed}
        currSlowSpeed={currSlowSpeed}
        onFastSpeedChange={onFastSpeedChange}
        onSlowSpeedChange={onSlowSpeedChange}
      />

      <ClockComponent
        title="Rest Time"
        seconds={restSecs}
        onMinutesDown={restOnMinuteDown}
        onMinutesUp={restOnMinuteUp}
        onSecondsDown={restOnSecondsDown}
        onSecondsUp={restOnSecondsUp}
      />
      <StartButton
        onClick={() => {
          navigation.navigate('Action', {
            restTime: restSecs,
            workoutTime: actions,
            workoutType: REACTION,
            slowSpeed: currActionDur + currSlowSpeed,
            fastSpeed: currActionDur + currFastSpeed,
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
};

export default ReactionWorkout;
