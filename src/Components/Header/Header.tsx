import React, { VoidFunctionComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderTitle } from './HeaderTitle';
import { HeaderBtn } from './HeaderBtn';
import { COLOR_SCHEME } from '../../utils/Constants';

type HeaderProps = {
  navigation: any;
  loadAction: () => void;
  saveAction: () => void;
  title: string;
  hideLoadSaveBtns?: boolean;
  hideSettingsBtn?: boolean;
  customBtnAction?: () => void;
  customBtnStyle?: any;
  customBtnText?: string;
  hideCustomBtn?: boolean;
};

const Header: React.FC<HeaderProps> = ({
  navigation,
  loadAction,
  saveAction,
  title,
  hideLoadSaveBtns = true,
  hideSettingsBtn = false,
  customBtnAction,
  customBtnStyle,
  customBtnText,
  hideCustomBtn = true,
}) => {
  return (
    <View style={styles.view}>
      <View style={styles.mainTitle}>
        <Text style={styles.text}>{title}</Text>
      </View>
      <View style={styles.icons}>
        {customBtnAction && customBtnText && !hideCustomBtn && (
          <HeaderBtn
            text={customBtnText}
            action={customBtnAction}
            btnStyle={customBtnStyle}
          />
        )}
        {!hideLoadSaveBtns && (
          <View style={styles.saveNloadBtns}>
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
          </View>
        )}
        {!hideSettingsBtn && (
          <HeaderBtn
            iconName="cog"
            action={() => navigation.navigate('Settings')}
            hideButton={hideSettingsBtn}
          />
        )}
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
    height: 70,
  },
  mainTitle: {
    flex: 1,
    marginBottom: 5,
  },
  saveNloadBtns: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
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

export default Header;
