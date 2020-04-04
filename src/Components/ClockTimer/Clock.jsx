import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLOR_SCHEME } from '../../utils/Constants';

const getText = (num) => (num < 10 ? `0${num}` : num);

const ClockViewer = ({ seconds }) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return (
    <Text style={styles.clockText}>
      {`${getText(minutes)}:${getText(secs)}`}
    </Text>
  );
};

const styles = StyleSheet.create({
  clockText: {
    fontSize: 50,
    color: COLOR_SCHEME.white,
  },
});

export default ClockViewer;
