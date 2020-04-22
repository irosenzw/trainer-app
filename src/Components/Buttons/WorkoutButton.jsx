import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { COLOR_SCHEME } from '../../utils/Constants';

const WorkoutButton = ({
  onClick,
  iconName = null,
  text = null,
  style = null,
}) => {
  if (!text && !iconName) {
    return <></>;
  }
  return (
    <TouchableOpacity onPress={onClick} style={style || styles.btn}>
      {iconName ? (
        <Icon name={iconName} size={50} color={COLOR_SCHEME.white} />
      ) : (
        <Text style={styles.text}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    color: COLOR_SCHEME.white,
  },
  btn: {
    padding: 20,
    backgroundColor: COLOR_SCHEME.blue,
    borderRadius: 20,
  },
});

export default WorkoutButton;
