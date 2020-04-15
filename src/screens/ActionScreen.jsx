import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Wrapper from '../Components/Wrapper';

const ActionScreen = ({ navigation }) => {
  return (
    <Wrapper
      title="Action"
      backNav={() => navigation.navigate('Home')}
    >
      <View style={styles.mainView}>
        <View>
          <AnimatedCircularProgress
            size={350}
            width={40}
            fill={89}
            tintColor="#00e0ff"
            onAnimationComplete={() =>
              console.log('onAnimationComplete')
            }
            backgroundColor="#3d5875"
          />
        </View>
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  mainView: {
    display: 'flex',
    width: '95%',
    marginVertical: 3,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1,
  },
  animatedCircle: {},
});

export default ActionScreen;
