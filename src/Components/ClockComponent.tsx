import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UpDownArrows from './ClockTimer/UpDownArrows';
import ClockViewer from './ClockTimer/Clock';
import Card from './Layout/Card';

const ClockComponent: React.FC<ClockComponentProps> = ({
  title,
  seconds,
  onMinutesDown,
  onMinutesUp,
  onSecondsDown,
  onSecondsUp,
}) => {
  return (
    <Card title={title}>
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
    </Card>
  );
};

const styles = StyleSheet.create({
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
  },
  subjectView: {
    flex: 1,
    flexGrow: 3,
    alignItems: 'center',
  },
});

type ClockComponentProps = {
  title: string;
  seconds: number;
  onMinutesDown: () => void;
  onMinutesUp: () => void;
  onSecondsDown: () => void;
  onSecondsUp: () => void;
};

export default ClockComponent;
