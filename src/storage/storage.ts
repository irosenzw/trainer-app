import AsyncStorage from '@react-native-community/async-storage';

export const storeKey = async (
  key: string,
  value: string | number,
) => {
  try {
    await AsyncStorage.setItem(key, `${value}`);
  } catch (e) {
    console.log(`Could not store ${value} in ${key}. Error: ${e}`);
  }
};

export const storeObject = async (key: string, value: Object) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(`Could not store ${value} in ${key}. Error: ${e}`);
  }
};

export const getKey = async (key: string, isObject = false) => {
  try {
    const value = await AsyncStorage.getItem(key);

    if (value !== null && isObject) {
      return JSON.parse(value);
    }
    return value;
  } catch (e) {
    console.log(`Could get ${key}. Error: ${e}`);
  }
};
