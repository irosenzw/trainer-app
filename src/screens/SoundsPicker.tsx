import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Wrapper from '../Components/Wrapper';
import SoundsPickerRow from '../Components/SoundsPickerRow';
import { SoundMaker } from '../Audio/SoundMaker';
import Sound from 'react-native-sound';
import WorkoutButton from '../Components/Buttons/WorkoutButton';

const SoundPicker: React.FC<SoundPickerProps> = ({
  route,
  navigation,
}) => {
  const [pickedSounds, setPickedSounds] = React.useState<{
    [filename: string]: boolean;
  }>({});

  const [loadedSounds, setLoadedSounds] = React.useState<{
    [name: string]: Sound;
  }>({});

  const mySounds: string[] = route.params?.sounds || [];
  const soundFileList = Object.keys(pickedSounds);

  React.useEffect(() => {
    const getSoundObjects = async () => {
      const sm = new SoundMaker();
      await sm.loadSounds();
      setLoadedSounds(sm.getSounds());
      console.log('LOADED!');
    };

    if (Object.keys(loadedSounds).length === 0) {
      getSoundObjects();
    }
  }, []);

  React.useEffect(() => {
    const soundFileNames: string[] = Object.keys(loadedSounds).sort();
    setPickedSounds(
      Object.assign(
        {},
        ...soundFileNames.map((fileName) => {
          return {
            [fileName]: !!mySounds.find(
              (fname) => fname === fileName,
            ),
          };
        }),
      ),
    );
  }, [loadedSounds]);

  console.log('pickedSounds2:', pickedSounds);
  return (
    <Wrapper title="Sounds" backNav={() => navigation.goBack()}>
      <View style={styles.mainView}>
        {soundFileList.map((fileName) => (
          <SoundsPickerRow
            key={`${fileName}`}
            isChosen={pickedSounds[fileName]}
            soundFileName={`${fileName}`}
            onChange={() => {
              pickedSounds[fileName] = !pickedSounds[fileName];
            }}
            onPlay={() => loadedSounds[fileName].play()}
          />
        ))}
        <WorkoutButton
          style={{}}
          text="Save"
          onClick={() =>
            navigation.navigate('Reaction', {
              sounds: soundFileList.filter(
                (fileName) => pickedSounds[fileName],
              ),
            })
          }
        />
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  mainView: {
    display: 'flex',
    width: '100%',
    height: '80%',
    marginVertical: 3,
    alignItems: 'center',
    flexDirection: 'column',
  },
  view: {},
});

type SoundPickerProps = {
  route: any;
  navigation: any;
};

export default SoundPicker;
