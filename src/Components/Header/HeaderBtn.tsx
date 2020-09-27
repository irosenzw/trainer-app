/* eslint-disable import/prefer-default-export */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { COLOR_SCHEME } from '../../utils/Constants';

export const HeaderBtn: React.FC<HeaderBtnProps> = ({
  btnStyle,
  action,
  text,
  iconName,
  hideButton = false,
}) => {
  return (
    <View style={styles.view}>
    {!hideButton &&  (<TouchableOpacity style={styles.btn || btnStyle} onPress={action}>
        {!!text && <Text style={styles.text}>{text}</Text>}
        {!!iconName && (
          <Icon
            name={iconName}
            size={35}
            color={COLOR_SCHEME.white}
          />
        )}
    </TouchableOpacity>)}
    </View>

  );
};

const styles = StyleSheet.create({
  view: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    width: 35,
  },
  btn: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

type HeaderBtnProps = {
  btnStyle?: object;
  action: () => void;
  text?: string;
  iconName?: string;
  hideButton?: boolean;
};
