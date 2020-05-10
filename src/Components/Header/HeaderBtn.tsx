/* eslint-disable import/prefer-default-export */
import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export const HeaderBtn: React.FC<HeaderBtnProps> = ({
  btnStyle,
  action,
  text,
}) => {
  return (
    <TouchableOpacity style={[styles.btn, btnStyle]} onPress={action}>
      <Text style={styles.text}>{text}</Text>
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
  text: string;
};
