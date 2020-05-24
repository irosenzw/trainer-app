import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Switch,
} from 'react-native';
import { COLOR_SCHEME } from '../utils/Constants';
import Card from './Layout/Card';
import WorkoutRangeSlider from './WorkoutRangeSlider';
import { ScrollContext } from './Wrapper';

const { width } = Dimensions.get('screen');

type RangeSpeedComponentProps = {
  title: string;
  minValue: number; // Fastest value
  maxValue: number; // Slowest value
  currSlowSpeed?: number; // closer to max
  currFastSpeed: number; // closer to min - use also for single value mode
  onFastSpeedChange: (fastValue: number) => void;
  onSlowSpeedChange?: (slowValue: number) => void;
  rangeEnabled?: boolean;
};

const RangeSpeedComponent: React.FC<RangeSpeedComponentProps> = (
  props,
) => {
  const {
    title,
    currSlowSpeed,
    currFastSpeed,
    minValue,
    maxValue,
    onFastSpeedChange,
    onSlowSpeedChange,
    rangeEnabled = true,
  } = props;

  const setEnableScroll = React.useContext(ScrollContext);
  const rangeChanged = (low: number, high: number) => {
    if (low !== currFastSpeed) {
      onFastSpeedChange(low);
      return;
    }

    onSlowSpeedChange && onSlowSpeedChange(high);
  };

  return (
    <Card title={title} customHeight={180}>
      <View style={styles.labels}>
        <Text style={styles.labelStyle}>{currFastSpeed}</Text>
        {rangeEnabled && <Text style={styles.delimiter}>-</Text>}
        {rangeEnabled && (
          <Text style={styles.labelStyle}>{currSlowSpeed}</Text>
        )}
      </View>
      <View style={styles.mainView}>
        <WorkoutRangeSlider
          currFastSpeed={currFastSpeed}
          currSlowSpeed={currSlowSpeed}
          minValue={minValue}
          maxValue={maxValue}
          rangeEnabled={rangeEnabled}
          enableScrollView={setEnableScroll}
          updateSpeed={!rangeEnabled ? onFastSpeedChange : undefined}
          rangeChanged={rangeEnabled ? rangeChanged : undefined}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  mainView: {
    width: width,
    backgroundColor: COLOR_SCHEME.black,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '50%',
  },
  labelStyle: {
    flexDirection: 'row',
    marginBottom: 10,
    color: 'white',
    fontSize: 30,
  },
  delimiter: {
    flexDirection: 'row',
    marginBottom: 10,
    color: 'white',
    fontSize: 30,
    paddingHorizontal: 20,
  },
});

export default RangeSpeedComponent;
