import React, { useState } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import ImagePicker from 'react-native-image-crop-picker'
import { Avatar, BottomSheet, ListItem } from 'react-native-elements'

import styles from './styles'
import { Strings } from '../../Themes/Strings'
import { Colors } from '../../Themes'
import { checkCameraPermission, checkStoragePermission } from '../../Lib/utils'

const IMAGE_CONFIGS = {
  width: 300,
  height: 300,
  cropping: true
}

function ImageCropPicker (props) {
  const [isVisible, setIsVisible] = useState(false)
  const { onSelectImage, imgSrc } = props

  async function openCamera () {
    setIsVisible(false)
    await checkCameraPermission(() => {
      ImagePicker.openCamera(IMAGE_CONFIGS).then(imageData => {
        onSelectImage(imageData)
      })
    })
  }

  async function openGallery (index) {
    setIsVisible(false)
    await checkStoragePermission(() => {
      ImagePicker.openPicker(IMAGE_CONFIGS).then(imageData => {
        onSelectImage(imageData)
      })
    })
  }

  function openActionSheet () {
    setIsVisible(true)
  }

  const list = [
    { title: Strings.camera, onPress: openCamera },
    { title: Strings.gallery, onPress: openGallery },
    {
      title: Strings.cancel,
      titleStyle: { color: 'red' },
      onPress: () => setIsVisible(false)
    }
  ]

  return (
    <View>
      <Avatar
        onPress={openActionSheet}
        rounded
        icon={{ name: 'camera', color: Colors.blue, type: 'font-awesome', size: 30 }}
        source={{
          uri:
            'https://picsum.photos/200/300'
        }}
        size='large'
        containerStyle={styles.imageContainer}
      >
        <Avatar.Accessory size={20} onPress={openActionSheet} />
      </Avatar>
      <BottomSheet
        isVisible={isVisible}
        containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
      >
        {list.map((item, index) => (
          <ListItem key={index} containerStyle={item.containerStyle} onPress={item.onPress}>
            <ListItem.Content>
              <ListItem.Title style={item.titleStyle}>{item.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    </View>
  )
}

export default ImageCropPicker
ImageCropPicker.propTypes = {
  onSelectImage: PropTypes.func,
  title: PropTypes.string,
  defaultIcon: PropTypes.number
}
ImageCropPicker.defaultProps = {
  onSelectImage: () => {},
  title: Strings.uploadPhoto,
  defaultIcon: {}
}
