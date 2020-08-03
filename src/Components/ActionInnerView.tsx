import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Clock from './ClockTimer/Clock';
import { COLOR_SCHEME } from '../utils/Constants';

const ActionInnerView: React.FC<ActionInnerViewProps> = ({
  value,
  isWorkout,
  clockView,
  isFinish,
  currRound,
  totalRounds,
}) => {
  if (isFinish) {
    return <></>;
  }
  return (
    <View style={styles.View}>
      {!isWorkout && <Clock seconds={value} />}
      {clockView && isWorkout && <Clock seconds={value} />}
      {isWorkout && !clockView && (
        <Text style={styles.NumberText}>{value}</Text>
      )}
      {!isFinish && (
        <Text style={styles.RoundsText}>
          {`${currRound} / ${totalRounds}`}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  View: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  NumberText: {
    fontSize: 80,
    color: COLOR_SCHEME.white,
  },
  RoundsText: {
    fontSize: 40,
    color: COLOR_SCHEME.orange,
  },
});

type ActionInnerViewProps = {
  value: number;
  isWorkout: boolean;
  clockView: boolean;
  isFinish: boolean;
  currRound: number;
  totalRounds: number;
};

export default ActionInnerView;
