import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { COLOR_SCHEME } from '../utils/Constants';

const speedTypes = {
  slow: 5 * 1000, // 5 seconds
  normal: 1 * 1000, // 1 second
  fast: 0.5 * 1000, // 0.5 seconds
};

const speedArr = ['Slow', 'Normal', 'Fast'];

const SpeedComponent = ({ title }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  return (
    <View style={styles.mainView}>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>
          {title ? `${title}:` : 'TITLE:'}
        </Text>
      </View>
      <ButtonGroup
        onPress={(idx) => setSelectedIndex(idx)}
        selectedIndex={selectedIndex}
        buttons={speedArr}
        disabledStyle
        containerStyle={styles.componentView}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  mainView: {
    display: 'flex',
    width: '95%',
    height: '20%',
    marginVertical: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
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
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
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
});

export default SpeedComponent;
