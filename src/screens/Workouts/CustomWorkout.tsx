import React from 'react';
import Wrapper from '../../Components/Wrapper';
import Card from '../../Components/Layout/Card';
import RecorderComponent from '../../Components/Recorder';

type CustomWorkoutProps = {
  navigation: any;
};

const CustomWorkout: React.FC<CustomWorkoutProps> = ({
  navigation,
}) => {
  return (
    <Wrapper
      title="Custom"
      backNav={() => navigation.navigate('Home')}
      navigation={navigation}
    >
      {/*<RecorderComponent />*/}
      <Card title="" />
      <Card title="" />
      <Card title="" />
    </Wrapper>
  );
};

export default CustomWorkout;
