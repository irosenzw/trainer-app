import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreenBtn from '../Components/Btn';
import Wrapper from '../Components/Wrapper';

class HomeScreen extends React.Component {
  render() {
    return (
      <Wrapper title="Welcome">
        <View style={{ flexDirection: 'row' }}>
          <HomeScreenBtn
            text="Interval"
            action={() =>
              this.props.navigation.navigate('IntervalWorkout')
            }
          />
          <HomeScreenBtn
            text="Counter"
            action={() =>
              this.props.navigation.navigate('CounterWorkout')
            }
          />
        </View>
        <HomeScreenBtn text="Custom" action={{}} />
        <Icon name="rocket" size={30} color="#AAA" />
      </Wrapper>
    );
  }
}

// / color platte : https://coolors.co/011627-fdfffc-2ec4b6-e71d36-ff9f1c

const mapStateToProps = (state) => {
  return {
    mainTitle: state.ChangeTitle.mainTitle,
  };
};

export default connect(mapStateToProps)(HomeScreen);
