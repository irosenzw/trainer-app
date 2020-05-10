import React from 'react';
import { View, StyleSheet } from 'react-native';

const Container: React.FC<ContainerProps> = (props) => {
  return (
    <View style={[styles.container, props.style]}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 0,
    margin: 0,
    display: 'flex',
    backgroundColor: '#011627',
  },
});

type ContainerProps = {
  style?: object;
};

export default Container;
