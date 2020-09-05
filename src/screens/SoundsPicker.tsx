import React from 'react';
import Wrapper from '../Components/Wrapper';
import SoundsPickerRow from '../Components/SoundsPickerRow';
import { SoundMaker } from '../Audio/SoundMaker';
import Sound from 'react-native-sound';
import WorkoutButton from '../Components/Buttons/WorkoutButton';
import { ListComponent } from '../Components/List/ListComponent';

const SoundPicker: React.FC<SoundPickerProps> = ({
  route,
  navigation,
}) => {
  const mySounds: string[] = route.params?.sounds || [];
  const backTo: string = route.params?.backTo || 'Reaction';
  const singleValue: boolean = route.params?.singleValue || false;
  const settingsPath = route.params?.settingsPath || null;

  const [chosenSound, setChosenSound] = React.useState(
    singleValue ? mySounds[0] : null, // change to default
  );

  const [pickedSounds, setPickedSounds] = React.useState<{
    [filename: string]: boolean;
  }>({});

  const [loadedSounds, setLoadedSounds] = React.useState<{
    [name: string]: Sound;
  }>({});

  React.useEffect(() => {
    const getSoundObjects = async () => {
      const sm = new SoundMaker();
      await sm.loadSounds();
      setLoadedSounds(sm.getSounds());
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

  const onPickSound = (newFileName: string) => {
    if (!singleValue) {
      pickedSounds[newFileName] = !pickedSounds[newFileName];
      setPickedSounds(Object.assign({}, pickedSounds));
      return;
    }

    if (chosenSound) {
      if (chosenSound === newFileName) {
        return;
      }
      pickedSounds[chosenSound] = false;
      pickedSounds[newFileName] = true;
      setPickedSounds(pickedSounds);
      setChosenSound(newFileName);
    }
  };

  const soundFileList = Object.keys(pickedSounds);
  const isSaveDisabled = !soundFileList.find(
    (fname) => pickedSounds[fname],
  );

  return (
    <Wrapper title="Sounds" backNav={() => navigation.goBack()}>
      <ListComponent>
        {soundFileList.map((fileName) => (
          <SoundsPickerRow
            key={`${fileName}`}
            isChosen={pickedSounds[fileName]}
            soundFileName={`${fileName}`}
            onChange={() => onPickSound(fileName)}
            onPlay={() => loadedSounds[fileName].play()}
          />
        ))}
        <WorkoutButton
          style={{}}
          text="Save"
          disabled={isSaveDisabled}
          onClick={() =>
            navigation.navigate(backTo, {
              sounds: soundFileList.filter(
                (fileName) => pickedSounds[fileName],
              ),
              settingsPath,
            })
          }
        />
      </ListComponent>
    </Wrapper>
  );
};

type SoundPickerProps = {
  route: any;
  navigation: any;
};

export default SoundPicker;
