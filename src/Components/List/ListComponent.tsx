import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { COLOR_SCHEME } from '../../utils/Constants';

type ListComponentProps = {};

const { width } = Dimensions.get('window');

export const ListComponent: React.FC<ListComponentProps> = ({
  children,
}) => {
  return <View style={styles.listView}>{children}</View>;
};

type ListRowComponentProps = { keyProp: string };

export const ListRowComponent: React.FC<ListRowComponentProps> = ({
  keyProp,
  children,
}) => {
  return (
    <View style={styles.rowView} key={keyProp}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  listView: {
    display: 'flex',
    width: '100%',
    height: '80%',
    marginVertical: 3,
    alignItems: 'center',
    flexDirection: 'column',
  },
  rowView: {
    width: width,
    height: 60,
    borderColor: COLOR_SCHEME.white,
    borderBottomWidth: 0.2,
    borderTopWidth: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

// export default ListComponent;
