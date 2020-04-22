import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Clock from './ClockTimer/Clock';
import { COLOR_SCHEME } from '../utils/Constants';

const ActionInnterView = ({
  value,
  isWorkout,
  isInterval,
  isFinish,
}) => {
  if (isFinish) {
    return <></>;
  }
  return (
    <View>
      {!isWorkout && <Clock seconds={value} />}
      {isInterval && isWorkout && <Clock seconds={value} />}
      {isWorkout && !isInterval && (
        <Text style={styles.NumberText}>{value}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  NumberText: {
    fontSize: 80,
    color: COLOR_SCHEME.white,
  },
});

export default ActionInnterView;
