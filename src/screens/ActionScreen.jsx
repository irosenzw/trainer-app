import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Wrapper from '../Components/Wrapper';
import {
  COLOR_SCHEME,
  WORKOUT,
  REST,
  INTERVAL,
  FINISH,
  COUNTER,
} from '../utils/Constants';
import { useInterval } from '../Hooks/UseInterval';
import WorkoutButtonFooter from '../Components/WorkoutButtonFooter';
import ActionInnerView from '../Components/ActionInnerView';
import {
  playBell,
  playCount,
  playSuccess,
  playWarning,
} from '../Audio/SoundMaker';

const calcFill = (currValue, maxValue) =>
  Math.round((currValue / maxValue) * 100);

const getIsRunning = (isRunning) => {
  if (!isRunning || isRunning === 1) {
    return false;
  }
  return true;
};

const ActionScreen = ({ navigation }) => {
  const {
    restTime,
    workoutTime,
    workoutType,
    rounds,
  } = navigation.state.params;
  const speed = navigation.state.params.speed || 1000;
  const [workoutState, setWorkoutState] = React.useState(WORKOUT); // WORKOUT or REST or PREPARATION or FINISH or PAUSE //later SKIP
  const [workoutSecs, setWorkoutSecs] = React.useState(workoutTime);
  const [restSecs, setRestSecs] = React.useState(restTime);
  const [round, setRound] = React.useState(1);
  const [timerDelay, setTimerDelay] = React.useState(speed);

  const [outerCircleStyle, setOuterCircleStyle] = React.useState({
    tintColor: COLOR_SCHEME.blue,
    bg: COLOR_SCHEME.darkBlue,
  });

  const isFinish = () => workoutState === FINISH;

  const getSpeed = () => (workoutState === REST ? 1000 : speed);

  const debug = () => {
    console.log('workoutState', workoutState);
    console.log('workoutSecs', workoutSecs);
    console.log('restSecs', restSecs);
    console.log('round', round);
    console.log('timerDelay', timerDelay);
    console.log('*************************');
  };

  const calcInnerCircleValue = () => {
    // eslint-disable-next-line no-nested-ternary
    return workoutState === WORKOUT
      ? workoutType === INTERVAL
        ? workoutSecs
        : workoutTime - workoutSecs
      : restSecs;
  };

  const onStop = () => {
    setTimerDelay(1);
    setWorkoutState(FINISH);
    setOuterCircleStyle({
      tintColor: COLOR_SCHEME.blue,
      bg: COLOR_SCHEME.darkBlue,
    });
    setWorkoutSecs(workoutTime);
    setRestSecs(restTime);
    setRound(0);
  };

  const onStart = () => {
    if (isFinish()) {
      setRound(1);
      playBell();
      setWorkoutState(WORKOUT);
      setOuterCircleStyle({
        tintColor: COLOR_SCHEME.blue,
        bg: COLOR_SCHEME.darkBlue,
      });
    }
    setTimerDelay(getSpeed());
  };

  const onFinish = () => {
    onStop();
    setOuterCircleStyle({
      tintColor: COLOR_SCHEME.green,
      bg: COLOR_SCHEME.green,
    });
    playSuccess();
  };

  React.useEffect(() => {
    if (
      workoutSecs <= 3 &&
      workoutSecs > 0 &&
      workoutState === WORKOUT &&
      workoutType !== COUNTER
    ) {
      playWarning();
    }

    if (workoutSecs === -1) {
      setWorkoutSecs(workoutTime);
      setWorkoutState(REST);
      setOuterCircleStyle({
        tintColor: COLOR_SCHEME.yellow,
        bg: COLOR_SCHEME.darkYellow,
      });

      setTimerDelay(1000);
    }
  }, [workoutSecs]);

  React.useEffect(() => {
    if (restSecs <= 3 && restSecs > 0 && workoutState === REST) {
      playWarning();
    }
    if (restSecs === -1) {
      setRound(round + 1);
      setRestSecs(restTime);
      setWorkoutState(WORKOUT);
      setOuterCircleStyle({
        tintColor: COLOR_SCHEME.blue,
        bg: COLOR_SCHEME.darkBlue,
      });

      setTimerDelay(speed);
    }
  }, [restSecs]);

  React.useEffect(() => {
    if (round > rounds) {
      onFinish();
    }
  }, [round]);

  const fillOuterCircle = () => {
    return workoutState === WORKOUT
      ? calcFill(workoutTime - workoutSecs, workoutTime)
      : calcFill(restTime - restSecs, restTime);
  };

  useInterval(() => {
    if (
      workoutType === COUNTER &&
      workoutState === WORKOUT &&
      workoutSecs > 0
    ) {
      debug();
      playCount(workoutTime - workoutSecs + 1);
    }
    return workoutState === WORKOUT
      ? setWorkoutSecs(workoutSecs - 1)
      : setRestSecs(restSecs - 1);
  }, timerDelay);

  return (
    <Wrapper title="Action" backNav={() => navigation.goBack()}>
      <View style={styles.mainView}>
        <AnimatedCircularProgress
          size={350}
          width={30}
          fill={fillOuterCircle()}
          rotation={0}
          tintColor={outerCircleStyle.tintColor}
          backgroundColor={outerCircleStyle.bg}
          lineCap="butt"
        >
          {() => (
            <AnimatedCircularProgress
              size={250}
              width={20}
              fill={calcFill(round, rounds)}
              rotation={0}
              tintColor={COLOR_SCHEME.orange}
              backgroundColor={COLOR_SCHEME.darkOrange}
            >
              {() => (
                <ActionInnerView
                  value={calcInnerCircleValue()}
                  isInterval={workoutType === INTERVAL}
                  isWorkout={workoutState === WORKOUT}
                  isFinish={isFinish()}
                  currRound={round}
                  totalRounds={rounds}
                />
              )}
            </AnimatedCircularProgress>
          )}
        </AnimatedCircularProgress>
        <WorkoutButtonFooter
          onContinue={() => onStart()}
          onPause={() => setTimerDelay(null)}
          onStop={() => onStop()}
          isRunning={getIsRunning(timerDelay)}
          isFinish={isFinish()}
        />
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  mainView: {
    display: 'flex',
    width: '95%',
    marginVertical: 3,
    paddingTop: 40,
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1,
  },
  animatedCircle: {},
});

export default ActionScreen;
