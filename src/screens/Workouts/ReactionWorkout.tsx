import React from 'react';
import Wrapper from '../../Components/Wrapper';
import ClockComponent from '../../Components/ClockComponent';
import NumberComponent from '../../Components/NumberComponent';
import { onNumberUp, onNumberDown, onValueChange } from './utils';
import StartButton from '../../Components/Buttons/StartButton';
import RangeSpeedComponent from '../../Components/RangeSpeedComponent';
import ButtonGroupComponent from '../../Components/ButtonGroupComponent';
import SelectSoundsComponent from '../../Components/SelectSounds';
import { ReactionModes, WorkoutType } from '../../utils/types';
import { useSelector, shallowEqual } from 'react-redux';
import { getValue, toMilliseconds } from '../../utils/utils';

const minRounds = 1;
const maxRounds = 1000;
const minCountTo = 1;
const maxcountTo = 100;
const fastestValue = 200; // miliseconds - 0.2 seconds
const slowestValue = 10000; // miliseconds - 10 seconds

const ReactionWorkout: React.FC<CounterProps> = ({
  navigation,
  route,
}) => {
  const reactionSettings = useSelector(
    (state: any) => state.trainerState.Settings.reaction,
    shallowEqual,
  );

  const {
    reactionActionsNum,
    reactionTimer,
    reactionCounterNum,
    reactionRestTime,
    reactionRounds,
    timeBetweenActionsMin,
    timeBetweenActionsMax,
    reactionDefaultSound,
    actionDuration,
  } = reactionSettings;

  console.log(
    'settings: ',
    JSON.stringify(reactionSettings, null, 2),
  );

  const [countTo, setCountTo] = React.useState(
    getValue(reactionCounterNum),
  );
  const [actions, setActions] = React.useState(
    getValue(reactionActionsNum),
  );
  const [timerSecs, setTimerSecs] = React.useState(
    getValue(reactionTimer),
  );
  const [restSecs, setRestSecs] = React.useState(
    getValue(reactionRestTime),
  );
  const [rounds, setRounds] = React.useState(
    getValue(reactionRounds),
  );
  const [currFastSpeed, setCurrFastSpeed] = React.useState(
    toMilliseconds(getValue(timeBetweenActionsMin)),
  );
  const [currSlowSpeed, setCurrSlowSpeed] = React.useState(
    toMilliseconds(getValue(timeBetweenActionsMax)),
  );
  const [currActionDur, setCurrActionDur] = React.useState(
    toMilliseconds(getValue(actionDuration)),
  );
  const [mode, setMode] = React.useState(ReactionModes.Actions);

  const sounds = route.params?.sounds || [
    getValue(reactionDefaultSound),
  ];

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
      case ReactionModes.Counter:
        return countTo;
      case ReactionModes.Timer:
        return timerSecs;
      case ReactionModes.Actions:
        return actions;
      default:
        return null;
    }
  };

  return (
    <Wrapper
      title="Reaction"
      backNav={() => navigation.navigate('Home')}
      navigation={navigation}
    >
      <ButtonGroupComponent
        title="Mode"
        onChange={setMode}
        labelArr={[
          ReactionModes.Actions,
          ReactionModes.Counter,
          ReactionModes.Timer,
        ]}
      />

      {mode === ReactionModes.Counter && (
        <NumberComponent
          title="Count To"
          number={countTo}
          onUp={onCountToUp}
          onDown={onCountToDown}
        />
      )}

      {mode === ReactionModes.Actions && (
        <NumberComponent
          title="Actions"
          number={actions}
          onUp={onActionUp}
          onDown={onActionDown}
        />
      )}
      {mode === ReactionModes.Timer && (
        <ClockComponent
          title="Timer"
          seconds={timerSecs}
          onSecondsChange={setTimerSecs}
        />
      )}

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

      {mode !== 'Counter' && (
        <SelectSoundsComponent
          navigateToSoundPicker={() =>
            navigation.navigate('SoundsPicker', { sounds })
          }
        />
      )}

      <StartButton
        onClick={() => {
          navigation.navigate('Action', {
            restTime: restSecs,
            workoutTime: getWorkoutTime(), // actions,
            workoutType: WorkoutType.Reaction,
            slowSpeed: currActionDur + currSlowSpeed,
            fastSpeed: currActionDur + currFastSpeed,
            rounds,
            mode,
            sounds,
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

export default ReactionWorkout;
