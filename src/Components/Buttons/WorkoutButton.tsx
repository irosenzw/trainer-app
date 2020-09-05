import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { COLOR_SCHEME } from '../../utils/Constants';

const WorkoutButton: React.FC<WorkoutButtonProps> = (props) => {
  const {
    text,
    iconName,
    style = null,
    textStyle = null,
    onClick,
    disabled = false,
  } = props;
  if (!text && !iconName) {
    return <></>;
  }

  return (
    <TouchableOpacity
      onPress={onClick}
      style={style || styles.btn}
      disabled={disabled}
    >
      {iconName ? (
        <Icon name={iconName} size={50} color={COLOR_SCHEME.white} />
      ) : (
        <Text
          style={
            disabled ? styles.disabledText : textStyle || styles.text
          }
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    color: COLOR_SCHEME.white,
  },
  btn: {},
  disabledText: {
    fontSize: 30,
    color: COLOR_SCHEME.grey,
  },
});

type WorkoutButtonProps = {
  onClick: () => void;
  iconName?: string;
  text?: string;
  style?: object;
  textStyle?: object;
  disabled?: boolean;
};

export default WorkoutButton;
