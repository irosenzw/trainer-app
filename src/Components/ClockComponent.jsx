import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UpDownArrows from './ClockTimer/UpDownArrows';
import ClockViewer from './ClockTimer/Clock';

const ClockComponent = ({
  title,
  seconds,
  onMinutesDown,
  onMinutesUp,
  onSecondsDown,
  onSecondsUp,
}) => {
  return (
    <View style={styles.mainView}>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>
          {title ? `${title}:` : 'TITLE:'}
        </Text>
      </View>
      <View style={styles.componentView}>
        <View style={styles.buttonView}>
          <UpDownArrows onUp={onMinutesUp} onDown={onMinutesDown} />
        </View>
        <View style={styles.subjectView}>
          <ClockViewer seconds={seconds} />
        </View>
        <View style={styles.buttonView}>
          <UpDownArrows onUp={onSecondsUp} onDown={onSecondsDown} />
        </View>
      </View>
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
    height: '90%',
    flex: 1,
    flexGrow: 1,
    alignItems: 'center',
  },
  subjectView: {
    flex: 4,
    flexGrow: 3,
    paddingBottom: 25,
    alignItems: 'center',
  },
});

export default ClockComponent;
