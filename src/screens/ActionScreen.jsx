import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Wrapper from '../Components/Wrapper';
import { COLOR_SCHEME, WORKOUT, REST } from '../utils/Constants';
import Clock from '../Components/ClockTimer/Clock';
import { useInterval } from '../Hooks/UseInterval';

const calcFill = (currValue, maxValue) =>
  Math.round((currValue / maxValue) * 100);

const ActionScreen = ({
  navigation,
  restTime = 2,
  workoutTime = 3,
  workoutType = 'INTERVAL',
  rounds = 3,
  speed = 1000,
}) => {
  const [workoutState, setWorkoutState] = React.useState(WORKOUT); // WORKOUT or REST or PREPARATION or FINISH or PAUSE //later SKIP
  const [workoutSecs, setWorkoutSecs] = React.useState(
    workoutType === 'INTERVAL' ? workoutTime : 0,
  );
  const [restSecs, setRestSecs] = React.useState(restTime);
  const [round, setRound] = React.useState(rounds);
  const [isRunning, setIsRunning] = React.useState(true);
  const [outerCircleStyle, setOuterCircleStyle] = React.useState({
    tintColor: COLOR_SCHEME.blue,
    bg: COLOR_SCHEME.darkBlue,
  });

  if (workoutSecs === -1) {
    //setIsRunning(false);
    setWorkoutSecs(workoutTime);
    setWorkoutState(REST);
    setOuterCircleStyle({
      tintColor: COLOR_SCHEME.yellow,
      bg: COLOR_SCHEME.darkYellow,
    });
  }

  if (restSecs === -1) {
    setRound(round + 1);
    setRestSecs(restTime);
    setWorkoutState(WORKOUT);
    setOuterCircleStyle({
      tintColor: COLOR_SCHEME.blue,
      bg: COLOR_SCHEME.darkBlue,
    });
  }

  const fillOuterCircle = () => {
    return workoutState === WORKOUT
      ? calcFill(workoutTime - workoutSecs, workoutTime)
      : calcFill(restTime - restSecs, restTime);
  };

  useInterval(
    () =>
      workoutState === WORKOUT
        ? setWorkoutSecs(workoutSecs - 1)
        : setRestSecs(restSecs - 1),
    isRunning ? 1000 : 1,
  );

  /*console.log('workoutState:', workoutState);
  console.log('workoutSecs:', workoutSecs);
  console.log('restSecs:', restSecs);
  console.log('round:', round);
  console.log(
    'calcFill:',
    calcFill(workoutTime - workoutSecs, workoutTime),
  );
  console.log('**********************');*/

  return (
    <Wrapper
      title="Action"
      backNav={() => navigation.navigate('Home')}
    >
      <View style={styles.mainView}>
        <View>
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
                fill={2}
                rotation={0}
                tintColor={COLOR_SCHEME.orange}
                onAnimationComplete={() =>
                  console.log('onAnimationComplete2')
                }
                backgroundColor={COLOR_SCHEME.darkOrange}
              >
                {() => (
                  <Clock
                    seconds={
                      workoutState === WORKOUT
                        ? workoutSecs
                        : restSecs
                    }
                  />
                )}
              </AnimatedCircularProgress>
            )}
          </AnimatedCircularProgress>
        </View>
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
    // justifyContent: 'sp',
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1,
  },
  animatedCircle: {},
});

export default ActionScreen;
