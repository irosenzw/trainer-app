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
      <HeaderBtn text="btn2" action={() => console.log()} />
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

type HeaderProps = {
  backNav: () => void;
  title: string;
};

export default Header;
