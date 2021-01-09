import React, { Children } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLOR_SCHEME } from '../utils/Constants';
import { ExpRowComponent } from './List/ListComponent';

type ListRowWithCheckBoxProps = {
  title: string;
  isChosen: boolean;
  onChecked: () => void;
};

const ListRowWithCheckBox: React.FC<ListRowWithCheckBoxProps> = ({
  title,
  isChosen,
  onChecked,
  children,
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(true);

  return (
    <ExpRowComponent keyProp={title}>
      <View style={styles.rowView}>
        <View style={styles.chkboxView}>
          <CheckBox
            center
            title={title}
            textStyle={styles.chkboxText}
            containerStyle={styles.chkBoxContainer}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={isChosen}
            onPress={onChecked}
          />
        </View>
        <View style={styles.playView}>
          <TouchableOpacity
            onPress={() => setIsCollapsed(!isCollapsed)}
          >
            <Icon
              name={isCollapsed ? 'plus-square' : 'minus-square'}
              size={30}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Collapsible collapsed={isCollapsed}>{children}</Collapsible>
      </View>
    </ExpRowComponent>
  );
};

const styles = StyleSheet.create({
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
  },
  chkboxText: {
    color: COLOR_SCHEME.orange,
    fontSize: 20,
    marginLeft: 30,
  },
  chkBoxContainer: {
    backgroundColor: COLOR_SCHEME.black,
    borderWidth: 0,
  },
  chkboxView: {
    width: '88%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  playView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ListRowWithCheckBox;
