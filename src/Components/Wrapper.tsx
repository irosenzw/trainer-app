import React, { ReactNode, Children } from 'react';
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
  scrollEnabled?: boolean;
};

const { width } = Dimensions.get('screen');

const pageLayout: React.FC<WrapperProps> = ({
  title,
  backNav,
  scrollEnabled = true,
  children,
}) => {
  return (
    <View style={styles.mainLayout}>
      <Header title={title} backNav={backNav} />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        scrollEnabled={scrollEnabled}
      >
        {children}
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
