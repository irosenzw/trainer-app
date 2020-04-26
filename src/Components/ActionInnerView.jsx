import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Clock from './ClockTimer/Clock';
import { COLOR_SCHEME } from '../utils/Constants';

const ActionInnerView = ({
  value,
  isWorkout,
  isInterval,
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
      {isInterval && isWorkout && <Clock seconds={value} />}
      {isWorkout && !isInterval && (
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

export default ActionInnerView;
