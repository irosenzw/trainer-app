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
  backNav?: any;
};

const { width } = Dimensions.get('screen');

export const ScrollContext = createContext<any>(null);

const pageLayout: React.FC<WrapperProps> = ({
  title,
  backNav,
  children,
}) => {
  const [enableScroll, setEnableScroll] = React.useState(true);
  return (
    <View style={styles.mainLayout}>
      <Header title={title} backNav={backNav} />
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
