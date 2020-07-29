import RNFS from 'react-native-fs';

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