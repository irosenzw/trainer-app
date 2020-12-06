import RNFS from 'react-native-fs';
import { askForPremissions } from './askForPremissions';
import { SOUNDS_PATH, WORKOUTS_PATH } from './Constants';
import { createDir, isPathExists } from './fsUtils';

export const copyAllAudioFiles = async () => {
  if (!(await isPathExists(SOUNDS_PATH))) {
    await createDir(SOUNDS_PATH);
  }

  const audioFiles = await RNFS.readDirAssets('audio');

  return Promise.all(
    audioFiles.map(async (record) => {
      const fName = record.path.split('/')[1];
      const distPath = `${SOUNDS_PATH}/${fName}`;

      if (!(await RNFS.exists(distPath))) {
        await RNFS.copyFileAssets(`${record.path}`, distPath);
      }
    }),
  );
};

const createWorkoutsDir = async () => {
  if (!(await isPathExists(WORKOUTS_PATH))) {
    await createDir(WORKOUTS_PATH);
  }
};

export const setup = async () => {
  await askForPremissions();
  await copyAllAudioFiles();
  await createWorkoutsDir();
};
