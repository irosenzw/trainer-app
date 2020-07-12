import React from 'react';
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
  onValueChange,
} from './utils';
import StartButton from '../../Components/Buttons/StartButton';
import { REACTION } from '../../utils/Constants';
import RangeSpeedComponent from '../../Components/RangeSpeedComponent';
import ButtonGroupComponent from '../../Components/ButtonGroupComponent';

const minRounds = 1;
const maxRounds = 1000;
const minCountTo = 1;
const maxcountTo = 100;
const fastestValue = 200; // miliseconds - 0.2 seconds
const slowestValue = 10000; // miliseconds - 10 seconds
const reactionModes = ['Timer', 'Counter', 'Actions'];

const ReactionWorkout: React.FC<CounterProps> = ({ navigation }) => {
  const [countTo, setCountTo] = React.useState(10);
  const [actions, setActions] = React.useState(10);
  const [timerSecs, setTimerSecs] = React.useState(30);
  const [restSecs, setRestSecs] = React.useState(0);
  const [rounds, setRounds] = React.useState(minRounds);
  const [currFastSpeed, setCurrFastSpeed] = React.useState(1000);
  const [currSlowSpeed, setCurrSlowSpeed] = React.useState(5000);
  const [currActionDur, setCurrActionDur] = React.useState(1000);
  const [mode, setMode] = React.useState(reactionModes[0]);

  // Actions
  const onActionDown = React.useCallback(
    () => onNumberDown(setActions, actions, minCountTo),
    [actions],
  );

  const onActionUp = React.useCallback(
    () => onNumberUp(setActions, actions, maxcountTo),
    [actions],
  );

  // CountTo
  const onCountToDown = React.useCallback(
    () => onNumberDown(setCountTo, countTo, minCountTo),
    [countTo],
  );

  const onCountToUp = React.useCallback(
    () => onNumberUp(setCountTo, countTo, maxcountTo),
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

  const getWorkoutTime = () => {
    switch (mode) {
      case 'Counter':
        return countTo;
      case 'Timer':
        return timerSecs;
      case 'Actions':
        return actions;
      default:
        return null;
    }
  };

  return (
    <Wrapper
      title="Reaction"
      backNav={() => navigation.navigate('Home')}
    >
      <ButtonGroupComponent
        title="Mode"
        onChange={setMode}
        labelArr={reactionModes}
      />

      {mode === 'Counter' && (
        <NumberComponent
          title="Count To"
          number={countTo}
          onUp={onCountToUp}
          onDown={onCountToDown}
        />
      )}

      {mode === 'Actions' && (
        <NumberComponent
          title="Actions"
          number={actions}
          onUp={onActionUp}
          onDown={onActionDown}
        />
      )}
      {mode === 'Timer' && (
        <ClockComponent
          title="Timer"
          seconds={timerSecs}
          onSecondsChange={setTimerSecs}
        />
      )}
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
        onSecondsChange={setRestSecs}
      />
      <StartButton
        onClick={() => {
          navigation.navigate('Action', {
            restTime: restSecs,
            workoutTime: getWorkoutTime(), // actions,
            workoutType: REACTION,
            slowSpeed: currActionDur + currSlowSpeed,
            fastSpeed: currActionDur + currFastSpeed,
            rounds,
            mode,
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
