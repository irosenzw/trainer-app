import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HeaderTitle } from './HeaderTitle';
import { HeaderBtn } from './HeaderBtn';
import { COLOR_SCHEME } from '../../utils/Constants';

const Header: React.FC<HeaderProps> = ({
  navigation,
  backNav,
  title,
}) => {
  return (
    <View style={styles.view}>
      <HeaderBtn iconName="chevron-left" action={backNav} />
      <HeaderTitle title={title} />
      <HeaderBtn
        iconName="cog"
        action={() => navigation.navigate('Settings')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: COLOR_SCHEME.orange,
    borderBottomWidth: 0.2,
  },
});

type HeaderProps = {
  navigation: any;
  backNav: () => void;
  title: string;
};

export default Header;
