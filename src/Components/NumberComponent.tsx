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
import { TextInput } from 'react-native';

const NumberComponent: React.FC<NumberComponentProps> = ({
  title,
  number,
  onDown,
  onUp,
  onChange
}) => {

  const [val, setVal] = React.useState(number);

  React.useEffect(() => {
    if (val !== number) {
      setVal(number);
    }
  }, [number])

  const submitChange = () => {
    onChange(val);
    if (val !== number) {
      setVal(number);
    }
  }

  return (
    <Card title={title}>
      <View style={styles.componentView}>
        <View style={styles.buttonView}>
          <TouchableOpacity onPress={onDown}>
            <Icon name="minus-circle" size={40} color="#AAA" />
          </TouchableOpacity>
        </View>
        <View style={styles.subjectView}>
          <TextInput
            style={styles.NumberText}
            keyboardType='numeric'
            onChangeText={(v) => setVal(parseInt(v))}
            onBlur={submitChange}
            value={val ? `${val}` : ''}
          />
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
  number: number;
  onDown: () => void;
  onUp: () => void;
  onChange: (val: number) => void;
};

export default NumberComponent;
