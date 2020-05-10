import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLOR_SCHEME } from '../utils/Constants';

const NumberComponent: React.FC<NumberComponentProps> = ({
  title,
  number,
  onDown,
  onUp,
}) => {
  return (
    <View style={styles.mainView}>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>
          {title ? `${title}:` : 'TITLE:'}
        </Text>
      </View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    display: 'flex',
    width: '95%',
    // height: '20%',
    marginVertical: 3,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1,
  },
  titleView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  titleText: {
    color: 'white',
    fontSize: 20,
  },
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
