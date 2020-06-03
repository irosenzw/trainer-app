import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { COLOR_SCHEME } from '../utils/Constants';
import Card from './Layout/Card';

const speedTypes: { [key: string]: number } = {
  slow: 5 * 1000, // 5 seconds
  normal: 1 * 1000, // 1 second
  fast: 0.5 * 1000, // 0.5 seconds
};

const speedArr: string[] = ['slow', 'normal', 'fast'];

const ButtonGroupComponent: React.FC<ButtonGroupComponentProps> = ({
  title,
  updateSpeed,
  labelArr = [],
}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const onPress = (idx: number) => {
    setSelectedIndex(idx);
    updateSpeed(speedTypes[speedArr[idx]]);
  };

  return (
    <Card title={title}>
      <ButtonGroup
        onPress={(idx) => onPress(idx)}
        selectedIndex={selectedIndex}
        buttons={labelArr}
        containerStyle={styles.componentView}
        buttonStyle={styles.ButtonStyle}
        textStyle={styles.ButtonText}
        selectedButtonStyle={styles.SelectedButtonStyle}
        innerBorderStyle={{ width: 0, color: COLOR_SCHEME.white }}
      />
    </Card>
  );
};
const styles = StyleSheet.create({
  componentView: {
    width: '90%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
    borderWidth: 0,
    borderRadius: 8,
    backgroundColor: COLOR_SCHEME.black,
  },
  ButtonStyle: {
    backgroundColor: COLOR_SCHEME.orange,
    borderRadius: 8,
  },
  ButtonText: {
    color: COLOR_SCHEME.black,
    fontSize: 20,
  },
  SelectedButtonStyle: {
    backgroundColor: COLOR_SCHEME.darkOrange,
  },
});

type ButtonGroupComponentProps = {
  title: string;
  updateSpeed: (speed: number) => void;
  labelArr: string[];
};

export default ButtonGroupComponent;
