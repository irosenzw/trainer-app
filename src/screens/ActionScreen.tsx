import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
// @ts-ignore
import KeepAwake from 'react-native-keep-awake';
import Wrapper from '../Components/Wrapper';
import { COLOR_SCHEME } from '../utils/Constants';
import { useInterval } from '../Hooks/UseInterval';
import WorkoutButtonFooter from '../Components/WorkoutButtonFooter';
import ActionInnerView from '../Components/ActionInnerView';
import { playSound, playText } from '../Audio/SoundMaker';
import {
  playBell,
  playCount,
  playSuccess,
  playWarning,
  playLongBeep,
} from '../Audio/SoundMaker';
import {
  WorkoutPhase,
  WorkoutType,
  ReactionModes,
} from '../utils/types';
import { useSelector, shallowEqual } from 'react-redux';
import { getValue } from '../utils/utils';
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

  const allSettings = useSelector(
    (state: any) => state.trainerState.Settings,
    shallowEqual,
  );

  const enterWorkoutSound = getValue(
    allSettings.general.startRoundSound,
  );
  const enterRestSound = getValue(allSettings.general.endRoundSound);
  const warningSound = getValue(allSettings.interval.warningSound);

  const prepTime: number = getValue(allSettings.general.prepTime);
  const warningTime: number = getValue(
    allSettings.interval.warningTime,
  );
  const speed: number = route?.params?.speed || 1000;
  const sounds: string[] = route?.params?.sounds;
  const fastSpeed: number = route?.params?.fastSpeed * 1000 || 1000;
  const slowSpeed: number = route?.params?.slowSpeed * 1000 || 1000;

  const [workoutState, setWorkoutState] = React.useState<string>(
    prepTime > 0 ? WorkoutPhase.Preparation : WorkoutPhase.Workout,
  ); // WORKOUT or REST or PREPARATION or FINISH or PAUSE //later SKIP
  const [workoutSecs, setWorkoutSecs] = React.useState<number>(
    prepTime > 0 ? prepTime : workoutTime,
  );
  const [restSecs, setRestSecs] = React.useState<number>(restTime);
  const [prepSecs, setPrepSecs] = React.useState<number>(prepTime);
  const [round, setRound] = React.useState<number>(0);
  const [timerDelay, setTimerDelay] = React.useState<any>(1000);
  const [rtLastSoundTime, setRTLastSoundTime] = React.useState<any>(
    workoutTime,
  );

  const [outerCircleStyle, setOuterCircleStyle] = React.useState(
    prepTime > 0
      ? {
          tintColor: COLOR_SCHEME.red,
          bg: COLOR_SCHEME.darkBlue,
        }
      : {
          tintColor: COLOR_SCHEME.blue,
          bg: COLOR_SCHEME.darkBlue,
        },
  );

  const isFinish = () => workoutState === WorkoutPhase.Finish;
  const isWorkout = () => workoutState === WorkoutPhase.Workout;
  const isRest = () => workoutState === WorkoutPhase.Rest;
  const isPrep = () => workoutState === WorkoutPhase.Preparation;

  const isClockView = () =>
    workoutType === WorkoutType.Interval ||
    (workoutType === WorkoutType.Reaction &&
      mode === ReactionModes.Timer);

  const isPlayReactionSounds = () =>
    workoutType === WorkoutType.Reaction &&
    !![ReactionModes.Timer, ReactionModes.Actions].find(
      (x) => x === mode,
    );

  const isCounterMode = () =>
    workoutType === WorkoutType.Counter ||
    (workoutType === WorkoutType.Reaction && mode === 'Counter');

  const playReactionSound = () => {
    const randomIdx = Math.floor(Math.random() * sounds.length);
    const sound = sounds[randomIdx];
    if (mode === 'Actions') {
      playSound(sound);
    }
    if (mode === 'Timer') {
      const timePassed = (rtLastSoundTime - workoutSecs) * 1000;
      if (timePassed >= slowSpeed) {
        playSound(sound);
        setRTLastSoundTime(workoutSecs);
        return;
      }
      if (timePassed >= fastSpeed && Math.random() > 0.5) {
        playSound(sound);
        setRTLastSoundTime(workoutSecs);
      }
    }
  };

  const getSpeed = () => (isRest() || isPrep() ? 1000 : speed);

  const debug = () => {
    console.log('workoutState', workoutState);
    console.log('workoutSecs', workoutSecs);
    console.log('restSecs', restSecs);
    console.log('round', round);
    console.log('timerDelay', timerDelay);
    console.log('isPlayCounterSound', isCounterMode());
    console.log('*************************');
  };

  const calcReactionSpeeds = (mode = 'simple'): number => {
    const diff = (slowSpeed - fastSpeed) / 1000;
    if (diff === 0) {
      return slowSpeed;
    }

    const rand = Math.random();

    // Simple mode: 3 speeds: fast, slow, middle
    if (mode === 'simple') {
      if (rand <= 0.33) {
        return fastSpeed;
      }
      if (rand > 0.66) {
        return slowSpeed;
      }

      return fastSpeed + diff * 1000;
    }

    // advanced mode: fast, slow, every second in between
    const optionsCount = diff <= 0.5 ? 2 : Math.round(diff) + 1; // 3 <> 6 will be 3,4,5,6 while 6 - 3 is 3
    const randInterval = 1 / optionsCount;
    const res = Math.floor(rand / randInterval);

    if (res + 1 === optionsCount) {
      return slowSpeed;
    }

    const calcSpeed = fastSpeed + res * 1000;
    return calcSpeed > slowSpeed ? slowSpeed : calcSpeed;
  };

  const calcInnerCircleValue = () => {
    let value;
    let max;
    switch (workoutState) {
      case WorkoutPhase.Preparation:
        value = prepSecs;
        max = prepTime;
        break;
      case WorkoutPhase.Rest:
        value = restSecs;
        max = restTime;
        break;
      default:
        // WORKOUT
        max = workoutTime;
        value = isClockView()
          ? workoutSecs // for INTERVAL
          : workoutTime - workoutSecs; // for COUNTER
    }

    value = value < 0 ? 0 : value;
    value = value > max ? max : value;
    return value;
  };

  const fillOuterCircle = () => {
    switch (workoutState) {
      case WorkoutPhase.Preparation:
        return calcFill(prepTime - prepSecs, prepTime);
      case WorkoutPhase.Rest:
        return calcFill(restTime - restSecs, restTime);
      default:
        // WORKOUT
        return calcFill(workoutTime - workoutSecs, workoutTime);
    }
  };

  const startRestPhase = () => {
    setWorkoutState(WorkoutPhase.Rest);
    setOuterCircleStyle({
      tintColor: COLOR_SCHEME.yellow,
      bg: COLOR_SCHEME.darkYellow,
    });

    playSound(enterRestSound);
    setTimerDelay(1000);
  };

  const nextRound = () => {
    setRound(round + 1);
    if (round > 0 && restTime === 0 && isCounterMode()) {
      setWorkoutSecs(workoutTime - 1);
      playCount(1);
    } else {
      setWorkoutSecs(workoutTime);
    }
    setRestSecs(restTime);
    setWorkoutState(WorkoutPhase.Workout);
    setOuterCircleStyle({
      tintColor: COLOR_SCHEME.blue,
      bg: COLOR_SCHEME.darkBlue,
    });

    // Reaction:
    if (workoutType === WorkoutType.Reaction) {
      if (mode === ReactionModes.Timer) {
        setRTLastSoundTime(workoutTime);
      }
      setTimerDelay(calcReactionSpeeds());
    }

    // Interval:
    setTimerDelay(speed);
    if (workoutType === WorkoutType.Interval) {
      playSound(enterWorkoutSound);
    }
  };

  const onStop = () => {
    setTimerDelay(1);
    setWorkoutState(WorkoutPhase.Finish);
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
      setWorkoutState(WorkoutPhase.Preparation);
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
    // if workout ended
    if (workoutSecs === -1) {
      // Finish workout
      if (round === rounds) {
        onFinish();
      } else {
        // Next round
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
      isRest() &&
      warningTime > 0 &&
      restSecs === warningTime &&
      restTime !== warningTime
    ) {
      playText('Get ready');
    }

    if (restSecs === -1) {
      nextRound();
    }
  }, [restSecs]);

  useInterval(() => {
    switch (workoutState) {
      case WorkoutPhase.Preparation:
        setPrepSecs(prepSecs - 1);
        break;
      case WorkoutPhase.Rest:
        setRestSecs(restSecs - 1);
        break;
      default:
        // WORKOUT
        setWorkoutSecs(workoutSecs - 1);

        if (
          warningTime > 0 &&
          workoutSecs > 1 &&
          workoutSecs <= warningTime + 1 &&
          workoutTime !== warningTime &&
          workoutType === WorkoutType.Interval
        ) {
          playText(`${workoutSecs - 1}`);
        }

        // Reaction: Set new delay every tick
        if (
          workoutType === WorkoutType.Reaction &&
          mode !== 'Timer'
        ) {
          setTimerDelay(calcReactionSpeeds());
        }

        // Counter (or Reaction counter mode): play Count on every tick
        if (isCounterMode() && workoutSecs > 0) {
          playCount(workoutTime - workoutSecs + 1);
        }

        // Reaction: play reaction sound
        if (isPlayReactionSounds() && workoutSecs > 0) {
          playReactionSound();
        }
    }
  }, timerDelay);

  return (
    <Wrapper title="Action" navigation={null} hideHeader={true}>
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
                  clockView={isClockView()}
                  isWorkout={workoutState === WorkoutPhase.Workout}
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
    paddingTop: 80,
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
