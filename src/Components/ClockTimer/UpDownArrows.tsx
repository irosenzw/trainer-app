import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const UpDownButtons: React.FC<UpDownButtonsProps> = ({
  onUp,
  onDown,
}) => {
  return (
    <View styles={styles.arrowsView}>
      <TouchableOpacity onPress={onUp}>
        <Icon name="chevron-up" size={30} color="#AAA" />
      </TouchableOpacity>
      <Text />
      <TouchableOpacity onPress={onDown}>
        <Icon name="chevron-down" size={30} color="#AAA" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  arrowsView: {
    borderColor: 'blue',
    borderWidth: 5,
  },
});

type UpDownButtonsProps = {
  onUp: () => void;
  onDown: () => void;
};

export default UpDownButtons;
