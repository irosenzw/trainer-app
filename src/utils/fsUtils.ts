import RNFS from 'react-native-fs';
import { WORKOUTS_PATH } from './Constants';

// list file names in dirPath - dirPath is absolute path
export const listFileNames = async (
  dirPath: string,
): Promise<string[]> => {
  return RNFS.readdir(dirPath);
};

export const createDir = async (dirPath: string) => {
  await RNFS.mkdir(dirPath);
};

export const isPathExists = async (
  dirPath: string,
): Promise<boolean> => {
  return RNFS.exists(dirPath);
};

export const createFile = async (fileName: string, content: string) =>
  await RNFS.writeFile(`${WORKOUTS_PATH}/${fileName}.json`, content);
