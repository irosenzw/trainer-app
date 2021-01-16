import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLOR_SCHEME } from '../utils/Constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ListRowComponent } from './List/ListComponent';

const SoundsPickerRow: React.FC<SoundsPickerRowProps> = ({
  soundFileName,
  isChosen,
  onChange,
  onPlay,
}) => {
  return (
    <ListRowComponent keyProp={soundFileName}>
      <View style={styles.chkboxView}>
        <CheckBox
          center
          title={soundFileName}
          textStyle={styles.chkboxText}
          containerStyle={styles.chkBoxContainer}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={isChosen}
          onPress={onChange}
        />
      </View>
      <View style={styles.playView}>
        <TouchableOpacity onPress={onPlay} style={styles.playBtnView}>
          <Icon name="play" size={35} color={COLOR_SCHEME.orange} />
        </TouchableOpacity>
      </View>
    </ListRowComponent>
  );
};

const styles = StyleSheet.create({
  chkboxText: {
    color: COLOR_SCHEME.orange,
    fontSize: 20,
  },
  chkBoxContainer: {
    backgroundColor: COLOR_SCHEME.black,
    borderWidth: 0,
  },
  chkboxView: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  playView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playBtnView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
});

type SoundsPickerRowProps = {
  soundFileName: string;
  isChosen: boolean;
  onChange: () => void;
  onPlay: () => void;
};

export default SoundsPickerRow;
