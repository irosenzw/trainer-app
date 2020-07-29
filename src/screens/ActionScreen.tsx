import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import KeepAwake from 'react-native-keep-awake';
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
import { REACTION } from '../utils/Constants';
import { playSound } from '../Audio/SoundMaker';
import {
  playBell,
  playCount,
  playSuccess,
  playWarning,
  playLongBeep,
} from '../Audio/SoundMaker';
const calcFill = (currValue: number, maxValue: number): number =>
  Math.round((currValue / maxValue) * 100);

const getIsRunning = (isRunning: number): boolean => {
  if (!isRunning || isRunning === 1) {
    return false;
  }
  return true;
};

const ActionScreen: React.FC<ActionScreenProps> = ({
  route,
  navigation,
}) => {
  const {
    restTime,
    workoutTime,
    workoutType,
    rounds,
    mode,
  } = route.params;
  const prepTime: number = 2;
  const playWarningSoundTime: number = 3;
  const speed: number = route?.params?.speed || 1000;
  const sounds: string[] = route?.params?.sounds;
  const fastSpeed: number = route?.params?.fastSpeed || 1000;
  const slowSpeed: number = route?.params?.slowSpeed || 1000;

  const [workoutState, setWorkoutState] = React.useState<string>(
    PREPARATION,
  ); // WORKOUT or REST or PREPARATION or FINISH or PAUSE //later SKIP
  const [workoutSecs, setWorkoutSecs] = React.useState<number>(
    prepTime,
  );
  const [restSecs, setRestSecs] = React.useState<number>(restTime);
  const [prepSecs, setPrepSecs] = React.useState<number>(prepTime);
  const [round, setRound] = React.useState<number>(0);
  const [timerDelay, setTimerDelay] = React.useState<any>(1000);

  const [outerCircleStyle, setOuterCircleStyle] = React.useState({
    tintColor: COLOR_SCHEME.red,
    bg: COLOR_SCHEME.darkBlue,
  });

  const isFinish = () => workoutState === FINISH;
  const isWorkout = () => workoutState === WORKOUT;
  const isRest = () => workoutState === REST;
  const isPrep = () => workoutState === PREPARATION;

  const isPlayReactionSounds = () =>
    workoutType === REACTION &&
    !!['Timer', 'Actions'].find((x) => x === mode);

  const isPlayCounterSound = () =>
    workoutType === COUNTER ||
    (workoutType === REACTION && mode === 'Counter');

  const playReactionSound = () => {
    const randomIdx = Math.floor(Math.random() * sounds.length);
    const sound = sounds[randomIdx];
    if (mode === 'Actions') {
      playSound(sound);
    }
    if (mode === 'Timer' && Math.random() > 0.5) {
      playSound(sound);
    }
  };

  const getSpeed = () => (isRest() || isPrep() ? 1000 : speed);

  const debug = () => {
    console.log('workoutState', workoutState);
    console.log('workoutSecs', workoutSecs);
    console.log('restSecs', restSecs);
    console.log('round', round);
    console.log('timerDelay', timerDelay);
    console.log('isPlayCounterSound', isPlayCounterSound());
    console.log('*************************');
  };

  const calcReactionSpeeds = (): number =>
    Math.round(fastSpeed + (slowSpeed - fastSpeed) * Math.random());

  const calcInnerCircleValue = () => {
    let value;
    let max;
    switch (workoutState) {
      case PREPARATION:
        value = prepSecs;
        max = prepTime;
        break;
      case REST:
        value = restSecs;
        max = restTime;
        break;
      default:
        // WORKOUT
        max = workoutTime;
        value =
          workoutType === INTERVAL
            ? workoutSecs // for INTERVAL
            : workoutTime - workoutSecs; // for COUNTER
    }

    value = value < 0 ? 0 : value;
    value = value > max ? max : value;
    return value;
  };

  const fillOuterCircle = () => {
    switch (workoutState) {
      case PREPARATION:
        return calcFill(prepTime - prepSecs, prepTime);
      case REST:
        return calcFill(restTime - restSecs, restTime);
      default:
        // WORKOUT
        return calcFill(workoutTime - workoutSecs, workoutTime);
    }
  };

  const startRestPhase = () => {
    setWorkoutState(REST);
    setOuterCircleStyle({
      tintColor: COLOR_SCHEME.yellow,
      bg: COLOR_SCHEME.darkYellow,
    });

    playLongBeep();
    setTimerDelay(1000);
  };

  const nextRound = () => {
    setRound(round + 1);
    if (round > 0 && restTime === 0 && isPlayCounterSound()) {
      setWorkoutSecs(workoutTime - 1);
      playCount(1);
    } else {
      setWorkoutSecs(workoutTime);
    }
    setRestSecs(restTime);
    setWorkoutState(WORKOUT);
    setOuterCircleStyle({
      tintColor: COLOR_SCHEME.blue,
      bg: COLOR_SCHEME.darkBlue,
    });
    workoutType === REACTION && setTimerDelay(calcReactionSpeeds());

    setTimerDelay(speed);
    if (workoutType === INTERVAL) {
      playBell();
    }
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
    setPrepSecs(prepTime);
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
    if (prepSecs === -1) {
      nextRound();
    }
  }, [prepSecs]);

  React.useEffect(() => {
    if (
      isWorkout() &&
      workoutSecs === playWarningSoundTime &&
      workoutTime !== playWarningSoundTime &&
      workoutType !== COUNTER &&
      workoutType !== REACTION
    ) {
      playWarning();
    }

    if (workoutSecs === -1) {
      if (round === rounds) {
        // Finish workout
        onFinish();
      } else {
        if (restTime === 0) {
          nextRound();
        } else {
          // move to Rest phase
          startRestPhase();
        }
      }
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
    switch (workoutState) {
      case PREPARATION:
        setPrepSecs(prepSecs - 1);
        break;
      case REST:
        setRestSecs(restSecs - 1);
        break;
      default:
        // WORKOUT
        setWorkoutSecs(workoutSecs - 1);
        workoutType === REACTION &&
        mode !== 'Timer' && // Set new delay every tick
          setTimerDelay(calcReactionSpeeds());

        // play Count on every tick
        isPlayCounterSound() &&
          workoutSecs > 0 &&
          playCount(workoutTime - workoutSecs + 1);

        // play on of the
        isPlayReactionSounds() &&
          workoutSecs > 0 &&
          playReactionSound();
    }
  }, timerDelay);

  return (
    <Wrapper title="Action" backNav={() => navigation.goBack()}>
      <View style={styles.mainView}>
        <KeepAwake />
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
    width: '100%',
    marginVertical: 3,
    paddingTop: 50,
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1,
  },
  animatedCircle: {},
});

type NavigationParams = {
  restTime: number;
  workoutTime: number;
  workoutType: string;
  speed: number;
  rounds: number;
};

type ActionScreenProps = {
  navigation: any; // NavigationScreenProp<any, NavigationParams>;
  route: any;
};

export default ActionScreen;
