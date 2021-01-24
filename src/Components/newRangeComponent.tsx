import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLOR_SCHEME } from '../utils/Constants';
import Card from './Layout/Card';
import { TextInput } from 'react-native';
import NewNumberComponent from './NewNumberComponent';

const NumberComponent: React.FC<NumberComponentProps> = ({
  title,
  slowValue,
  fastValue,
  onSlowDown,
  onSlowUp,
  onFastDown,
  onFastUp,
  onSlowChange,
  onFastChange,
}) => {
  return (
    <Card title={title}>
      <View style={styles.componentView}>
        <NewNumberComponent
          value={slowValue}
          onDown={onSlowDown}
          onUp={onSlowUp}
          onChange={onSlowChange}
        />
        <NewNumberComponent
          value={fastValue}
          onDown={onFastDown}
          onUp={onFastUp}
          onChange={onFastChange}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  componentView: {
    width: '85%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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

type NumberComponentProps = {
  title: string;
  slowValue: string;
  fastValue: string;
  onSlowDown: () => void;
  onSlowUp: () => void;
  onFastDown: () => void;
  onFastUp: () => void;
  onSlowChange: (val: string) => void;
  onFastChange: (val: string) => void;
};

export default NumberComponent;
