import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLOR_SCHEME } from '../utils/Constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

const SoundsPickerRow: React.FC<SoundsPickerRowProps> = ({
  soundFileName,
  isChosen,
  onChange,
  onPlay,
}) => {
  const [val, setVal] = React.useState(isChosen);
  return (
    <View style={styles.mainView} key={soundFileName}>
      <View style={styles.chkboxView}>
        <CheckBox
          center
          title={soundFileName}
          textStyle={styles.chkboxText}
          containerStyle={styles.chkBoxContainer}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={val}
          onPress={() => {
            setVal(!val);
            onChange();
          }}
        />
      </View>
      <View style={styles.playView}>
        <TouchableOpacity onPress={onPlay} style={styles.playBtnView}>
          <Icon name="play" size={35} color={COLOR_SCHEME.orange} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    width: width,
    height: 60,
    borderColor: COLOR_SCHEME.white,
    borderBottomWidth: 0.2,
    borderTopWidth: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    color: COLOR_SCHEME.white,
    fontSize: 20,
  },
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
