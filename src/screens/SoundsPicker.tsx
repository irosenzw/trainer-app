import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Wrapper from '../Components/Wrapper';
import { listFileNames } from '../utils/fsUtils';
import { SOUNDS_PATH } from '../utils/Constants';
import SoundsPickerRow from '../Components/SoundsPickerRow';
import { SoundMaker } from '../Audio/SoundMaker';
import Sound from 'react-native-sound';

const SoundPicker: React.FC<SoundPickerProps> = ({
  route,
  navigation,
}) => {
  const [soundFileList, setSoundFileList] = React.useState<string[]>(
    [],
  );
  const [availableSounds, setAvailableSounds] = React.useState<{
    [filename: string]: boolean;
  }>({});

  const [loadedSounds, setLoadedSounds] = React.useState<{
    [name: string]: Sound;
  }>({});

  const [pickedFiles, setPickedFiles] = React.useState<string[]>([]);

  const updatePickedSounds = () =>
    setPickedFiles(
      soundFileList.filter((fileName) => availableSounds[fileName]),
    );

  React.useEffect(() => {
    const getSoundObjects = async () => {
      const sm = new SoundMaker();
      await sm.loadSounds();
      setLoadedSounds(sm.getSounds());
    };
    if (Object.keys(loadedSounds).length === 0) {
      getSoundObjects();
    }
  }, [loadedSounds]);

  React.useEffect(() => {
    const getAllSounds = async () => {
      const soundFiles = await listFileNames(SOUNDS_PATH);
      setSoundFileList(soundFiles.sort());
      setAvailableSounds(
        Object.assign(
          {},
          ...soundFiles.map((fileName) => {
            return { [fileName]: false };
          }),
        ),
      );
    };

    if (soundFileList.length === 0) {
      getAllSounds();
    }
  }, [soundFileList]);

  return (
    <Wrapper title="Sounds" backNav={() => navigation.goBack()}>
      <View style={styles.mainView}>
        {soundFileList.map((fileName) => (
          <SoundsPickerRow
            isChosen={availableSounds[fileName]}
            soundFileName={`${fileName}`}
            onChange={() => {
              availableSounds[fileName] = !availableSounds[fileName];
              updatePickedSounds();
            }}
            onPlay={() => loadedSounds[fileName].play()}
          />
        ))}
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
