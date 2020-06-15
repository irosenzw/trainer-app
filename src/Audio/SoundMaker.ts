/* eslint-disable import/prefer-default-export */
import Sound from 'react-native-sound';
import { listFileNames } from '../utils/fsUtils';

Sound.setCategory('Playback');

const sd: { [name: string]: Sound } = {};

const getAllSounds = async () => {
  const soundFiles = await listFileNames(
    '/storage/emulated/0/TrainMe/Sounds/App/',
  );
  soundFiles.forEach(
    (sound) =>
      (sd[sound] = new Sound(
        `/storage/emulated/0/TrainMe/Sounds/App/${sound}`,
        '',
        (e) => e && console.log(`Error:`, e),
      )),
  );
  sd['boxingBell.mp3'].setVolume(0.5);
};
getAllSounds();

export const playBell = () => sd['bell-ring.mp3'].play();
export const playSuccess = () => sd['success.mp3'].play();
export const playWarning = () => sd['boxingBell.mp3'].play();
export const playKyai = () => sd['kyai.mp3'].play();
export const playLongBeep = () => sd['longBeep.mp3'].play();

export const playCount = (currCount: number) => {
  if (currCount === 0) {
    return;
  }

  switch (currCount % 10) {
    case 1:
      sd['1.mp3'].play();
      break;
    case 2:
      sd['2.mp3'].play();
      break;
    case 3:
      sd['3.mp3'].play();
      break;
    case 4:
      sd['4.mp3'].play();
      break;
    case 5:
      sd['5.mp3'].play();
      break;
    case 6:
      sd['6.mp3'].play();
      break;
    case 7:
      sd['7.mp3'].play();
      break;
    case 8:
      sd['8.mp3'].play();
      break;
    case 9:
      sd['9.mp3'].play();
      break;
    default:
      sd['10.mp3'].play();
  }
};
