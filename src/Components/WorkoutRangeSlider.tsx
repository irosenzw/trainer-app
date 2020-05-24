import React from 'react';
import RangeSlider from 'rn-range-slider';
import { COLOR_SCHEME } from '../utils/Constants';

type TimeRangeSliderProps = {
  minValue: number;
  maxValue: number;
  currFastSpeed: number;
  currSlowSpeed?: number;
  rangeEnabled?: boolean;
  enableScrollView?: (b: boolean) => void;
  rangeChanged?: (l: number, h: number) => void;
  updateSpeed?: (n: number) => void;
};

const TimeRangeSlider: React.FC<TimeRangeSliderProps> = ({
  rangeEnabled,
  minValue,
  maxValue,
  currFastSpeed,
  currSlowSpeed,
  enableScrollView,
  rangeChanged = () => {},
  updateSpeed = () => {},
}) => {
  return (
    <RangeSlider
      style={{ width: '80%', height: '100%' }}
      rangeEnabled={rangeEnabled}
      valueType="number"
      gravity="center"
      thumbRadius={15}
      labelStyle="none"
      labelBackgroundColor={COLOR_SCHEME.darkOrange}
      labelTextColor={COLOR_SCHEME.white}
      labelBorderColor={COLOR_SCHEME.darkOrange}
      labelFontSize={20}
      min={minValue}
      max={maxValue}
      initialLowValue={currFastSpeed}
      initialHighValue={currSlowSpeed || undefined}
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
  );
};

export default TimeRangeSlider;
