import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { COLOR_SCHEME } from '../../utils/Constants';

const StartButton = ({ onClick }) => {
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={onClick}>
        <View style={styles.view}>
          <Text style={styles.text}>Start</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    marginTop: 20,
    padding: 20,
    backgroundColor: COLOR_SCHEME.blue,
    borderRadius: 20,
    // flexShrink: 1,
  },
  text: {
    fontSize: 30,
    color: COLOR_SCHEME.white,
  },
});

export default StartButton;
