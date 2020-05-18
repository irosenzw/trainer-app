import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import RangeSlider from 'rn-range-slider';
import { COLOR_SCHEME } from '../utils/Constants';
import { Input } from 'react-native-elements';
import Card from './Layout/Card';

type TimeRangeSliderProps = {
  title: string;
  minValue: number;
  maxValue: number;
  currSlowSpeed: number;
  currFastSpeed: number;
  onFastSpeedChange: (fastValue: number) => void;
  onSlowSpeedChange: (slowValue: number) => void;
  rangeChanged?: (low: number, high: number) => void;
  updateSpeed?: (newSpeed: number) => void;
  rangeEnabled?: boolean;
  enableScrollView?: (b: boolean) => void;
};

const step = 50;

const TimeRangeSlider: React.FC<TimeRangeSliderProps> = ({
  title,
  currSlowSpeed, // closer to max
  currFastSpeed, // closer to min
  minValue,
  maxValue,
  onFastSpeedChange,
  onSlowSpeedChange,
  updateSpeed = () => {},
  rangeEnabled = true,
  enableScrollView,
}) => {
  const [min, setMin] = React.useState(200);
  const [max, setMax] = React.useState(10000);

  const rangeChanged = (low: number, high: number) => {
    if (low !== currFastSpeed) {
      onFastSpeedChange(low);
      return;
    }

    onSlowSpeedChange(high);
  };

  return (
    <Card title={title}>
      <RangeSlider
        style={{ width: '80%', height: '100%' }}
        rangeEnabled={rangeEnabled}
        valueType="number"
        gravity="center"
        thumbRadius={15}
        labelStyle="bubble"
        labelBackgroundColor={COLOR_SCHEME.darkOrange}
        labelTextColor={COLOR_SCHEME.white}
        labelBorderColor={COLOR_SCHEME.darkOrange}
        labelFontSize={20}
        min={minValue}
        max={maxValue}
        initialLowValue={currFastSpeed}
        initialHighValue={currSlowSpeed}
        step={50}
        lineWidth={15}
        selectionColor={COLOR_SCHEME.orange}
        blankColor={COLOR_SCHEME.darkOrange}
        thumbColor={COLOR_SCHEME.white}
        onTouchStart={() =>
          enableScrollView ? enableScrollView(false) : null
        }
        onTouchEnd={() =>
          enableScrollView ? enableScrollView(true) : null
        }
        onValueChanged={(low: number, high: number) => {
          rangeEnabled ? rangeChanged(low, high) : updateSpeed(low);
        }}
      />
    </Card>
  );
};

export default TimeRangeSlider;
