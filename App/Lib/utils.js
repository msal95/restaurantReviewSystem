import {Strings} from '../Themes/Strings';
import {Alert, Platform} from 'react-native';
import {showMessage as showFlashMessage} from 'react-native-flash-message';
import {openSettings, PERMISSIONS, request} from 'react-native-permissions';
import {MESSAGE_TYPES} from './constants';

export const checkStoragePermission = async (
  callback = () => {},
  errorCallback = () => {},
) => {
  await request(
    Platform.select({
      ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
      android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    }),
  )
    .then(response => {
      if (response === 'granted') {
        callback();
      } else {
        Alert.alert(
          Platform.OS === 'android'
            ? Strings.storagePermissionTitle
            : Strings.photosPermission,
          Platform.OS === 'android'
            ? Strings.storagePermissionMessage
            : Strings.photosPermissionMessage,
          [
            {text: Strings.cancel, style: 'cancel'},
            {
              text: Strings.settings,
              onPress: () => openSettings(),
            },
          ],
        );
      }
    })
    .catch(() => {
      errorCallback();
    });
};
export const checkCameraPermission = async (
  callback = () => {},
  errorCallback = () => {},
) => {
  await request(
    Platform.select({
      ios: PERMISSIONS.IOS.CAMERA,
      android: PERMISSIONS.ANDROID.CAMERA,
    }),
  )
    .then(response => {
      if (response === 'granted') {
        callback();
      } else {
        Alert.alert(
          Strings.cameraPermissionTitle,
          Strings.cameraPermissionMessage,
          [
            {text: Strings.cancel, style: 'cancel'},
            {
              text: Strings.settings,
              onPress: () => openSettings(),
            },
          ],
        );
      }
    })
    .catch(() => {
      errorCallback();
    });
};

export function printLogs(logs) {
  if (__DEV__) {
    console.log(logs);
    console.tron.warn(logs);
  }
}

export function showMessage(message, type = MESSAGE_TYPES.DEFAULT) {
  showFlashMessage({message, type});
}
