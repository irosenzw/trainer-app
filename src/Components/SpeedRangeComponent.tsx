import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLOR_SCHEME } from '../utils/Constants';
import Card from './Layout/Card';
import NumberComponent from './NumberComponent';
import SimpleNumComponent from './SimpleNumComponent';

type SpeedRangeRow = {
  title: string;
  value: string;
  onUp: () => void;
  onDown: () => void;
  onChange: (num: number | string) => void;
};

const SpeedRangeRow: React.FC<SpeedRangeRow> = ({
  title,
  value,
  onUp,
  onDown,
  onChange,
}) => {
  return (
    <View style={styles.rowView}>
      <View style={styles.textView}>
        <Text style={styles.textStyle}>{title}</Text>
      </View>
      <View style={styles.numComp}>
        <SimpleNumComponent
          number={value}
          onUp={onUp}
          onDown={onDown}
          onChange={onChange}
          btnSize={30}
          fontSize={30}
        />
      </View>
    </View>
  );
};

type SpeedRangeProps = {
  title: string;
  fastSpeed: string;
  slowSpeed: string;
  onFastUp: () => void;
  onFastDown: () => void;
  onFastChange: (num: string | number) => void;
  onSlowUp: () => void;
  onSlowDown: () => void;
  onSlowChange: (num: string | number) => void;
};

const SpeedRange: React.FC<SpeedRangeProps> = ({
  title,
  fastSpeed,
  slowSpeed,
  onFastUp,
  onFastDown,
  onFastChange,
  onSlowUp,
  onSlowDown,
  onSlowChange,
}) => {
  return (
    <Card title={title} customHeight={210}>
      <View style={styles.container}>
        <SpeedRangeRow
          title="Fast Speed:"
          value={fastSpeed}
          onUp={onFastUp}
          onDown={onFastDown}
          onChange={onFastChange}
        />
        <SpeedRangeRow
          title="Slow Speed: "
          value={slowSpeed}
          onUp={onSlowUp}
          onDown={onSlowDown}
          onChange={onSlowChange}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '95%',
  },
  numComp: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: COLOR_SCHEME.white,
    fontSize: 15,
  },
  textView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowView: {
    height: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default SpeedRange;
