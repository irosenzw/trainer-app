import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import { COLOR_SCHEME } from '../../utils/Constants';

const { width } = Dimensions.get('window');

const StartButton: React.FC<startButtonProps> = (props) => {
  return (
    <View style={styles.mainView}>
      <TouchableOpacity onPress={props.onClick}>
        <Text style={styles.view}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  view: {
    marginTop: 20,
    padding: 20,
    backgroundColor: COLOR_SCHEME.orange,
    borderRadius: 20,
    fontSize: 30,
    color: COLOR_SCHEME.white,
  },
  text: {},
});

type startButtonProps = {
  onClick: () => void;
};

export default StartButton;
