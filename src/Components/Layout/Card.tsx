import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { COLOR_SCHEME } from '../../utils/Constants';

const { width } = Dimensions.get('screen');
const defaultHeight = 150;

type CardProps = {
  title?: string;
  customHeight?: number;
};

const Card: React.FC<CardProps> = ({
  title,
  children,
  customHeight = defaultHeight,
}) => {
  return (
    <View style={[styles.mainView, { height: customHeight }]}>
      <Text style={styles.titleText}>{title ? `${title}:` : ''}</Text>
      <View style={styles.componentView}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    width: width,
    backgroundColor: COLOR_SCHEME.black,
    padding: 20,
  },
  titleText: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 10,
    color: 'white',
    fontSize: 20,
  },
  componentView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Card;
