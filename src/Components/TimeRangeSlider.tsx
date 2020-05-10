import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RangeSlider from 'rn-range-slider';

const TimeRangeSlider = () => {
  return (
    <RangeSlider
      // style={{ width: 160, height: 80 }}
      gravity="center"
      min={200}
      max={1000}
      step={20}
      selectionColor="#3df"
      blankColor="#f618"
      onValueChanged={(low: number, high: number) => {
        console.log(`rangeLow: ${low}, rangeHigh: ${high}`);
      }}
    />
  );
};

export default TimeRangeSlider;
