import React from 'react';
import Wrapper from '../../Components/Wrapper';
import Card from '../../Components/Layout/Card';

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
    >
      <Card title="" />
      <Card title="" />
      <Card title="" />
    </Wrapper>
  );
};

export default CustomWorkout;
