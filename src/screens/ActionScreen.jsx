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
  PREPARATION,
} from '../utils/Constants';
import { useInterval } from '../Hooks/UseInterval';
import WorkoutButtonFooter from '../Components/WorkoutButtonFooter';
import ActionInnerView from '../Components/ActionInnerView';
import {
  playBell,
  playCount,
  playSuccess,
  playWarning,
  playLongBeep,
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
  const prepTime = 5;
  const playWarningSoundTime = 3;
  const speed = navigation.state.params.speed || 1000;
  const [workoutState, setWorkoutState] = React.useState(PREPARATION); // WORKOUT or REST or PREPARATION or FINISH or PAUSE //later SKIP
  const [workoutSecs, setWorkoutSecs] = React.useState(prepTime);
  const [restSecs, setRestSecs] = React.useState(restTime);
  const [round, setRound] = React.useState(0);
  const [timerDelay, setTimerDelay] = React.useState(1000);

  const [outerCircleStyle, setOuterCircleStyle] = React.useState({
    tintColor: COLOR_SCHEME.red,
    bg: COLOR_SCHEME.darkBlue,
  });

  const isFinish = () => workoutState === FINISH;
  const isWorkout = () => workoutState === WORKOUT;
  const isRest = () => workoutState === REST;
  const isPrep = () => workoutState === PREPARATION;

  const getSpeed = () => (isRest() || isPrep() ? 1000 : speed);

  const debug = () => {
    console.log('workoutState', workoutState);
    console.log('workoutSecs', workoutSecs);
    console.log('restSecs', restSecs);
    console.log('round', round);
    console.log('timerDelay', timerDelay);
    console.log('*************************');
  };

  const calcInnerCircleValue = () => {
    const value =
      // eslint-disable-next-line no-nested-ternary
      isWorkout() || isPrep()
        ? workoutType === INTERVAL
          ? workoutSecs
          : workoutTime - workoutSecs
        : restSecs;

    return value < 0 ? 0 : value;
  };

  const fillOuterCircle = () => {
    switch (workoutState) {
      case PREPARATION:
        return calcFill(prepTime - workoutSecs, prepTime);
      case REST:
        return calcFill(restTime - restSecs, restTime);
      default:
        // WORKOUT
        return calcFill(workoutTime - workoutSecs, workoutTime);
    }
  };

  const nextRound = () => {
    setRound(round + 1);
    setWorkoutSecs(workoutTime);
    setRestSecs(restTime);
    setWorkoutState(WORKOUT);
    setOuterCircleStyle({
      tintColor: COLOR_SCHEME.blue,
      bg: COLOR_SCHEME.darkBlue,
    });

    setTimerDelay(speed);
    playBell();
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
      setRound(0);
      setWorkoutState(PREPARATION);
      setTimerDelay(1000);
      setOuterCircleStyle({
        tintColor: COLOR_SCHEME.red,
        bg: COLOR_SCHEME.darkBlue,
      });
    } else {
      setTimerDelay(getSpeed());
    }
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
      isWorkout() &&
      workoutSecs === playWarningSoundTime &&
      workoutTime !== playWarningSoundTime &&
      workoutType !== COUNTER
    ) {
      playWarning();
    }

    if (workoutSecs === -1) {
      if (round === rounds) {
        onFinish();
      } else {
        setWorkoutSecs(workoutTime);
        setWorkoutState(REST);
        setOuterCircleStyle({
          tintColor: COLOR_SCHEME.yellow,
          bg: COLOR_SCHEME.darkYellow,
        });

        // playLongBeep();
        setTimerDelay(1000);
      }
    }
    if (isPrep() && workoutSecs === -1) {
      nextRound();
    }
  }, [workoutSecs]);

  React.useEffect(() => {
    if (
      restSecs === playWarningSoundTime &&
      restTime !== playWarningSoundTime &&
      isRest()
    ) {
      playWarning();
    }
    if (restSecs === -1) {
      nextRound();
    }
  }, [restSecs]);

  useInterval(() => {
    if (workoutType === COUNTER && isWorkout() && workoutSecs > 0) {
      playCount(workoutTime - workoutSecs + 1);
    }
    return isWorkout() || isPrep()
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
