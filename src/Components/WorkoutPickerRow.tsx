import React, { Children } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLOR_SCHEME } from '../utils/Constants';
import { ExpRowComponent } from './List/ListComponent';

const { width } = Dimensions.get('window');

type ListRowWithCheckBoxProps = {
  title: string;
  isChosen: boolean;
  onChecked: () => void;
  onDelete: () => void;
};

const ListRowWithCheckBox: React.FC<ListRowWithCheckBoxProps> = ({
  title,
  isChosen,
  onChecked,
  onDelete,
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
        <View style={styles.iconsContainer}>
          <View style={styles.iconView}>
            <TouchableOpacity onPress={onDelete}>
              <Icon name="trash" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.iconView}>
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
      </View>
      <View>
        <Collapsible
          collapsed={isCollapsed}
          style={{ width: (width * 9) / 10 }}
        >
          {children}
        </Collapsible>
      </View>
    </ExpRowComponent>
  );
};

const styles = StyleSheet.create({
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
    alignSelf: 'stretch',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 25,
    flex: 1,
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
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 4,
  },
  iconView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ListRowWithCheckBox;
