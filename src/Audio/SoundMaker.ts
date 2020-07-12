/* eslint-disable import/prefer-default-export */
import Sound from 'react-native-sound';
import { listFileNames } from '../utils/fsUtils';
import { SOUNDS_PATH } from '../utils/Constants';

Sound.setCategory('Playback');

const getAllSounds2 = async () => {
  const soundFiles = await listFileNames(SOUNDS_PATH);
  return soundFiles.sort();
};

export class SoundMaker {
  private sounds: { [name: string]: Sound };
  private areSoundsLoaded: boolean; // Are sounds have been loaded

  constructor() {
    this.sounds = {};
    this.areSoundsLoaded = false;
  }

  public loadSounds = async () => {
    const fileNames = await getAllSounds2();
    fileNames.forEach(
      (sound) =>
        (this.sounds[sound] = new Sound(
          `${SOUNDS_PATH}/${sound}`,
          '',
          () => null,
        )),
    );

    this.sounds['boxingBell.mp3']
      ? this.sounds['boxingBell.mp3'].setVolume(0.5)
      : null;

    this.areSoundsLoaded = true;
  };

  public isLoaded = () => this.areSoundsLoaded;

  public getSounds = () => this.sounds;

  public playSound = (fileName: string) =>
    this.sounds[fileName].play();

  public playBell = () => this.sounds['bell-ring.mp3'].play();
  public playSuccess = () => this.sounds['success.mp3'].play();
  public playWarning = () => this.sounds['boxingBell.mp3'].play();
  public playKyai = () => this.sounds['kyai.mp3'].play();
  public playLongBeep = () => this.sounds['longBeep.mp3'].play();

  public playCount = (currCount: number) => {
    if (currCount === 0) {
      return;
    }

    switch (currCount % 10) {
      case 1:
        this.sounds['1.mp3'].play();
        break;
      case 2:
        this.sounds['2.mp3'].play();
        break;
      case 3:
        this.sounds['3.mp3'].play();
        break;
      case 4:
        this.sounds['4.mp3'].play();
        break;
      case 5:
        this.sounds['5.mp3'].play();
        break;
      case 6:
        this.sounds['6.mp3'].play();
        break;
      case 7:
        this.sounds['7.mp3'].play();
        break;
      case 8:
        this.sounds['8.mp3'].play();
        break;
      case 9:
        this.sounds['9.mp3'].play();
        break;
      default:
        this.sounds['10.mp3'].play();
    }
  };
}

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
        () => null,
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
