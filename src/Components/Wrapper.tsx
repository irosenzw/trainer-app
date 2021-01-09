import React, { ReactNode, Children, createContext } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Header from './Header/Header';
import { COLOR_SCHEME } from '../utils/Constants';

type WrapperProps = {
  title: string;
  loadAction?: any;
  saveAction?: any;
  navigation: any;
  hideLoadSaveBtns?: boolean;
  hideSettingsBtn?: boolean;
  hideHeader?: boolean;
  customBtnAction?: () => void;
  customBtnText?: string;
  customBtnStyle?: any;
  hideCustomBtn?: boolean;
};

export const ScrollContext = createContext<any>(null);

const pageLayout: React.FC<WrapperProps> = ({
  title,
  loadAction,
  saveAction,
  navigation,
  children,
  hideLoadSaveBtns,
  hideSettingsBtn,
  hideHeader = false,
  customBtnAction,
  customBtnText,
  customBtnStyle,
  hideCustomBtn,
}) => {
  const [enableScroll, setEnableScroll] = React.useState(true);
  return (
    <View style={styles.mainLayout}>
      {!hideHeader && (
        <Header
          title={title}
          loadAction={loadAction}
          saveAction={saveAction}
          navigation={navigation}
          hideLoadSaveBtns={hideLoadSaveBtns}
          hideSettingsBtn={hideSettingsBtn}
          customBtnAction={customBtnAction}
          customBtnText={customBtnText}
          customBtnStyle={customBtnStyle}
          hideCustomBtn={hideCustomBtn}
        />
      )}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        scrollEnabled={enableScroll}
      >
        <ScrollContext.Provider value={setEnableScroll}>
          {children}
        </ScrollContext.Provider>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainLayout: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR_SCHEME.black,
  },
});

export default pageLayout;
