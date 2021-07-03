import React, { useState } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import ImagePicker from 'react-native-image-crop-picker'
import { Avatar, BottomSheet, ListItem } from 'react-native-elements'

import styles from './styles'
import { Strings } from '../../Themes/Strings'
import { Colors, Metrics } from '../../Themes'
import { checkCameraPermission, checkStoragePermission } from '../../Lib/utils'
import { IMAGE_CONFIGS } from '../../Lib/constants'

function ImageCropPicker (props) {
  const [isVisible, setIsVisible] = useState(false)
  const { onSelectImage, imgSrc = {} } = props

  async function openCamera () {
    await checkCameraPermission(() => {
      ImagePicker.openCamera(IMAGE_CONFIGS).then(imageData => {
        setIsVisible(false)
        onSelectImage(imageData)
      })
    })
  }

  async function openGallery (index) {
    await checkStoragePermission(() => {
      ImagePicker.openPicker(IMAGE_CONFIGS).then(imageData => {
        setIsVisible(false)
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
      onPress: () => setIsVisible(false),
    },
  ]

  return (
    <View>
      <Avatar
        onPress={openActionSheet}
        rounded
        icon={{
          name: 'camera',
          color: Colors.blue,
          type: 'font-awesome',
          size: Metrics.thirty,
        }}
        source={{
          uri: imgSrc.path,
        }}
        size="large"
        containerStyle={styles.imageContainer}>
        <Avatar.Accessory size={20} onPress={openActionSheet}/>
      </Avatar>
      <BottomSheet isVisible={isVisible} containerStyle={styles.bottomSheet}>
        {list.map((item, index) => (
          <ListItem
            key={index}
            containerStyle={item.containerStyle}
            onPress={item.onPress}>
            <ListItem.Content>
              <ListItem.Title style={item.titleStyle}>
                {item.title}
              </ListItem.Title>
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
}
ImageCropPicker.defaultProps = {
  onSelectImage: () => {},
  title: Strings.uploadPhoto,
}
