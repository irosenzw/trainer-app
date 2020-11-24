import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderTitle } from './HeaderTitle';
import { HeaderBtn } from './HeaderBtn';
import { COLOR_SCHEME } from '../../utils/Constants';

const Header: React.FC<HeaderProps> = ({
  navigation,
  loadAction,
  saveAction,
  title,
  hideLoadSaveBtns = true,
  hideSettingsBtn = false,
}) => {
  return (
    <View style={styles.view}>
      <View style={{ flex: 1 }}>
        <Text style={styles.text}>{title}</Text>
      </View>
      <View style={styles.icons}>
        <HeaderBtn
          iconName="save"
          action={saveAction}
          hideButton={hideLoadSaveBtns}
        />
        <HeaderBtn
          iconName="upload"
          action={loadAction}
          hideButton={hideLoadSaveBtns}
        />
        <HeaderBtn
          iconName="cog"
          action={() => navigation.navigate('Settings')}
          hideButton={hideSettingsBtn}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderColor: COLOR_SCHEME.orange,
    borderBottomWidth: 0.2,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 40,
    textAlign: 'left',
    paddingLeft: 15,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

type HeaderProps = {
  navigation: any;
  loadAction: () => void;
  saveAction: () => void;
  title: string;
  hideLoadSaveBtns?: boolean;
  hideSettingsBtn?: boolean;
};

export default Header;
