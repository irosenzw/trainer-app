import React from 'react';
import { View, StyleSheet } from 'react-native';
import Container from './Container';

const RContainer = (props) => {
  return <View style={styles.rContainer}>{props.children}</View>;
};

const styles = StyleSheet.create({
  rContainer: {
    width: '75%',
    height: '15%',
    borderColor: 'green',
    borderWidth: 3,
    marginVertical: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default RContainer;
