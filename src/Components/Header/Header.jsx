import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HeaderTitle } from './HeaderTitle';
import { HeaderBtn } from './HeaderBtn';
import { COLOR_SCHEME } from '../../utils/Constants';

const Header = ({ backNav, title }) => {
  return (
    <View style={styles.view}>
      <HeaderBtn text="back" action={backNav} />
      <HeaderTitle title={title} />
      <HeaderBtn text="btn2" />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    borderColor: COLOR_SCHEME.orange,
    borderWidth: 3,
  },
  text: {
    color: 'white',
    padding: 10,
    borderColor: 'yellow',
    borderWidth: 3,
  },
});

export default Header;
