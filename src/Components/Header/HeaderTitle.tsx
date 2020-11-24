import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const HeaderTitle: React.FC<HeaderTitleProps> = ({
  title,
  textStyle,
}) => {
  return (
    <View>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 40,
    textAlign: 'left',
  },
});

type HeaderTitleProps = {
  textStyle?: object;
  title: string;
};
