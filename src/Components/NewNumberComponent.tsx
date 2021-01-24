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

const NewNumberComponent: React.FC<NumberComponentProps> = ({
  value,
  onDown,
  onUp,
  onChange,
}) => {
  const [val, setVal] = React.useState(value);

  /*React.useEffect(() => {
    if (val !== number) {
      setVal(number);
    }
  }, [number]);*/

  const submitChange = () => {
    onChange(val);
    if (val !== value) {
      setVal(value);
    }
  };

  return (
    <View style={styles.componentView}>
      <View style={styles.buttonView}>
        <TouchableOpacity onPress={onDown}>
          <Icon name="minus-circle" size={40} color="#AAA" />
        </TouchableOpacity>
      </View>
      <View style={styles.subjectView}>
        <TextInput
          style={styles.NumberText}
          keyboardType="numeric"
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
  value: string;
  onDown: () => void;
  onUp: () => void;
  onChange: (val: string) => void;
};

export default NewNumberComponent;
