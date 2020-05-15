import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLOR_SCHEME } from '../utils/Constants';
import Card from '../Components/Layout/Card';

const NumberComponent: React.FC<NumberComponentProps> = ({
  title,
  number,
  onDown,
  onUp,
}) => {
  return (
    <Card title={title}>
      <View style={styles.componentView}>
        <View style={styles.buttonView}>
          <TouchableOpacity onPress={onDown}>
            <Icon name="minus-circle" size={40} color="#AAA" />
          </TouchableOpacity>
        </View>
        <View style={styles.subjectView}>
          <Text style={styles.NumberText}>{number}</Text>
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity onPress={onUp}>
            <Icon name="plus-circle" size={40} color="#AAA" />
          </TouchableOpacity>
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
  number: number;
  onDown: () => void;
  onUp: () => void;
};

export default NumberComponent;
