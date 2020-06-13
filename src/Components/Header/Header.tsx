import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HeaderTitle } from './HeaderTitle';
import { HeaderBtn } from './HeaderBtn';
import { COLOR_SCHEME } from '../../utils/Constants';

const Header: React.FC<HeaderProps> = ({ backNav, title }) => {
  return (
    <View style={styles.view}>
      <HeaderBtn text="back" action={backNav} />
      <HeaderTitle title={title} />
      <HeaderBtn text="" action={() => console.log()} />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: COLOR_SCHEME.orange,
    borderBottomWidth: 0.2,
  },
});

type HeaderProps = {
  backNav: () => void;
  title: string;
};

export default Header;
