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
}) => {
  return (
    <TouchableOpacity style={[styles.btn, btnStyle]} onPress={action}>
      <View>
        {!!text && <Text style={styles.text}>{text}</Text>}
        {!!iconName && (
          <Icon
            name={iconName}
            size={35}
            color={COLOR_SCHEME.white}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: 50,
    textAlign: 'center',
    margin: 20,
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
};
