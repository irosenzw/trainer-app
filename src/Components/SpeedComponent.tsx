import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { COLOR_SCHEME } from '../utils/Constants';

const speedTypes: { [key: string]: number } = {
  slow: 5 * 1000, // 5 seconds
  normal: 1 * 1000, // 1 second
  fast: 0.5 * 1000, // 0.5 seconds
};

const speedArr: string[] = ['slow', 'normal', 'fast'];

const SpeedComponent: React.FC<SpeedComponentProps> = ({
  title,
  updateSpeed,
}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const onPress = (idx: number) => {
    setSelectedIndex(idx);
    updateSpeed(speedTypes[speedArr[idx]]);
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>
          {title ? `${title}:` : 'TITLE:'}
        </Text>
      </View>
      <ButtonGroup
        onPress={(idx) => onPress(idx)}
        selectedIndex={selectedIndex}
        buttons={speedArr}
        containerStyle={styles.componentView}
        buttonStyle={styles.ButtonStyle}
        textStyle={styles.ButtonText}
        selectedButtonStyle={styles.SelectedButtonStyle}
        innerBorderStyle={{ width: 0, color: COLOR_SCHEME.white }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  mainView: {
    display: 'flex',
    width: '95%',
    height: '20%',
    marginVertical: 3,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1,
  },
  titleView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  titleText: {
    color: 'white',
    fontSize: 20,
  },
  componentView: {
    width: '85%',
    height: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
    borderWidth: 0,
    borderRadius: 8,
    backgroundColor: COLOR_SCHEME.black,
  },
  buttonView: {
    flex: 1,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subjectView: {
    flex: 4,
    flexGrow: 3,
    alignItems: 'center',
  },
  NumberText: {
    fontSize: 50,
    color: COLOR_SCHEME.white,
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

type SpeedComponentProps = {
  title: String;
  updateSpeed: (speed: number) => void;
};

export default SpeedComponent;
