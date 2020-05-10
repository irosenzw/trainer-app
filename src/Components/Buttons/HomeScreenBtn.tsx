import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLOR_SCHEME } from '../../utils/Constants';

interface Props {
  text: string;
  action?: () => void;
}

const HomeScreenBtn: React.FC<Props> = (Props) => {
  const { action, text } = Props;
  return (
    <TouchableOpacity style={styles.btnStyle} onPress={action}>
      <Text style={styles.txt}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: COLOR_SCHEME.orange,
    width: 150,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    paddingBottom: 4,
    borderRadius: 20,
    // flex: 1
  },
  txt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default HomeScreenBtn;
