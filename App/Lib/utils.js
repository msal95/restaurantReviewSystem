import { Strings } from '../Themes/Strings'
import { Alert, Platform, Text, View } from 'react-native'
import { showMessage as showFlashMessage } from 'react-native-flash-message'
import { openSettings, PERMISSIONS, request } from 'react-native-permissions'

import { MESSAGE_TYPES } from './constants'
import React from 'react'

const styles = {
  errorContainer: { marginHorizontal: 10, top: -20 },
  errorMessage: { fontSize: 10, color: 'red', top: 0, marginTop: 0 },
}

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
        callback()
      } else {
        Alert.alert(
          Platform.OS === 'android'
            ? Strings.storagePermissionTitle
            : Strings.photosPermission,
          Platform.OS === 'android'
            ? Strings.storagePermissionMessage
            : Strings.photosPermissionMessage,
          [
            { text: Strings.cancel, style: 'cancel' },
            {
              text: Strings.settings,
              onPress: () => openSettings(),
            },
          ],
        )
      }
    })
    .catch(() => {
      errorCallback()
    })
}
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
        callback()
      } else {
        Alert.alert(
          Strings.cameraPermissionTitle,
          Strings.cameraPermissionMessage,
          [
            { text: Strings.cancel, style: 'cancel' },
            {
              text: Strings.settings,
              onPress: () => openSettings(),
            },
          ],
        )
      }
    })
    .catch(() => {
      errorCallback()
    })
}

export function printLogs (logs) {
  if (__DEV__) {
    console.log(logs)
    console.tron.warn(logs)
  }
}

export function showMessage (message, type = MESSAGE_TYPES.DEFAULT) {
  showFlashMessage({ message, type })
}

export function errorMessage (message, touched = false, style) {
  if (!message?.trim() || !touched) {
    return null
  }

  return (
    <View style={[styles.errorContainer, style]}>
      <Text style={styles.errorMessage}>{message}</Text>
    </View>
  )
}

export function getFormattedDescription (description, length = 30) {
  if (description?.length > length) {
    return <Text>{description?.slice(0, length)}...</Text>
  } else {
    return description
  }
}
