import React from 'react';
import Wrapper from '../../Components/Wrapper';
import ClockComponent from '../../Components/ClockComponent';
import NumberComponent from '../../Components/NumberComponent';
import { onNumberUp, onNumberDown, onNumberChange } from './utils';
import StartButton from '../../Components/Buttons/StartButton';
import RangeSpeedComponent from '../../Components/RangeSpeedComponent';
import { WorkoutType } from '../../utils/types';
import { useSelector, shallowEqual } from 'react-redux';
import { getValue } from '../../utils/utils';

const minRounds = 1;
const maxRounds = 1000;
const minCountTo = 1;
const maxCountTo = 100;
const fastestSpeed = 200;
const slowestSpeed = 10000;

const CounterWorkout: React.FC<CounterProps> = ({ navigation }) => {
  const counterSettings = useSelector(
    (state: any) => state.trainerState.Settings.counter,
    shallowEqual,
  );

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

  return (
    <Wrapper
      title="Counter"
      hideLoadSaveBtns={false}
      navigation={navigation}
    >
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
};

export default CounterWorkout;
