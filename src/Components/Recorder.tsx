import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import AudioRecorderPlayer, {
  AudioSet,
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  OutputFormatAndroidType,
} from 'react-native-audio-recorder-player';
import Card from './Layout/Card';
import { COLOR_SCHEME } from '../utils/Constants';
import { isPathExists, createDir } from '../utils/fsUtils';

const audioSet: AudioSet = {
  AudioEncoderAndroid: AudioEncoderAndroidType.AMR_WB,
  AudioSourceAndroid: AudioSourceAndroidType.MIC,
  OutputFormatAndroid: OutputFormatAndroidType.AMR_WB,
};

// const x = async () => await readdir('/storage/emulated/0/Download');
// List files in dir s
const r = async () => {
  if (!(await isPathExists('/storage/emulated/0/TrainMe/Sounds'))) {
    console.log('Create Sounds dir');
    createDir('/storage/emulated/0/TrainMe/Sounds/');
  }
};
r();

const RecorderComponent = () => {
  const audioRecorderPlayer = new AudioRecorderPlayer();

  return (
    <Card title={'Record'}>
      <View>
        <TouchableOpacity
          onPressIn={async () =>
            await audioRecorderPlayer.startRecorder(
              '/storage/emulated/0/sound.3gp',
              audioSet,
            )
          }
          onPressOut={async () =>
            await audioRecorderPlayer.stopRecorder()
          }
          style={{
            backgroundColor: COLOR_SCHEME.orange,
            width: 60,
            height: 60,
          }}
        >
          <Text style={{ color: COLOR_SCHEME.white }}>Record</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

export default RecorderComponent;
