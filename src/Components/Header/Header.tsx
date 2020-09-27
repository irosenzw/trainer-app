import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HeaderTitle } from './HeaderTitle';
import { HeaderBtn } from './HeaderBtn';
import { COLOR_SCHEME } from '../../utils/Constants';

const Header: React.FC<HeaderProps> = ({
  navigation,
  backNav,
  title,
  hideBackBtn = false,
  hideSettingsBtn = false,
}) => {
  return (
    <View style={styles.view}>
      <HeaderBtn iconName="chevron-left" action={backNav} hideButton={hideBackBtn}/>
      <View style={{flex: 1}}>
        <HeaderTitle title={title} />
      </View>
      <HeaderBtn
        iconName="cog"
        action={() => navigation.navigate('Settings')}
        hideButton={hideSettingsBtn}
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
  hideBackBtn?: boolean;
  hideSettingsBtn?: boolean;
};

export default Header;
