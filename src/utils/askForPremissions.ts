import { Platform, PermissionsAndroid } from 'react-native';

export const askForPremissions = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Permissions for write access',
          message: 'Give permission to your storage to write a file',
          buttonPositive: 'ok',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the storage');
      } else {
        console.log('storage permission denied');
        return;
      }
    } catch (err) {
      console.warn(err);
      return;
    }

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Permissions for write access',
          message: 'Give permission to your storage to write a file',
          buttonPositive: 'ok',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('camera permission denied');
        return;
      }
    } catch (err) {
      console.warn(err);
      return;
    }
  }
};
