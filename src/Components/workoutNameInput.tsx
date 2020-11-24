import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { COLOR_SCHEME } from '../utils/Constants';

type WorkoutNameInputProps = {
  onSubmit: (workoutName: string) => void;
};

const WorkoutNameInput: React.FC<WorkoutNameInputProps> = ({
  onSubmit,
}) => {
  const [workoutName, setWorkoutName] = React.useState('');
  const workoutNameRef = React.useRef(null);

  return (
    <View style={styles.view}>
      <Text style={styles.text}>Name: </Text>
      <TextInput
        style={styles.text}
        placeholder="Enter workout name"
        ref={workoutNameRef}
        placeholderTextColor={COLOR_SCHEME.whitePlaceHolder}
        value={workoutName}
        onChangeText={(v: string) => setWorkoutName(v)}
        onSubmitEditing={() => onSubmit(workoutName)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    paddingLeft: 20,
    flexDirection: 'row',
    borderColor: COLOR_SCHEME.white,
    borderBottomWidth: 0.3,
  },
  text: {
    color: COLOR_SCHEME.white,
    alignSelf: 'center',
    fontSize: 20,
  },
});

export default WorkoutNameInput;
