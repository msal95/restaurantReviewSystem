import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'
import PropTypes from 'prop-types'

import styles from './styles'

function BottomSheetModal (props) {
  const {
    children,
    isVisible,
    closeModal,
    backdropPress,
    modalStyle,
    containerStyle,
    barStyle,
    isTopBar,
    isHeader,
    headerText,
    backdropOpacity,
    avoidKeyboard,
    showClear,
    onClear
  } = props
  return (
    <Modal
      avoidKeyboard={avoidKeyboard}
      isVisible={isVisible}
      onRequestClose={closeModal}
      onBackdropPress={backdropPress || closeModal}
      onSwipeComplete={closeModal}
      backdropOpacity={backdropOpacity}
      animationType="slide"
      propagateSwipe
      swipeDirection={['down']}
      style={[styles.modal, modalStyle]}>
      <View activeOpacity={1} style={[styles.container, containerStyle]}>
        {isTopBar && <View style={[styles.topBar, barStyle]}/>}
        {isHeader && (
          <View style={styles.headerStyle}>
            <Text style={styles.headerTextStyle}>{headerText}</Text>
            {showClear && <TouchableOpacity style={styles.rightButton} onPress={onClear}>
              <Text style={styles.buttonsText}>Clear</Text>
            </TouchableOpacity>}
          </View>
        )}
        {children}
      </View>
    </Modal>
  )
}

BottomSheetModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  isTopBar: PropTypes.bool,
  closeModal: PropTypes.func.isRequired,
  modalStyle: PropTypes.object,
  containerStyle: PropTypes.object,
  barStyle: PropTypes.object,
  isHeader: PropTypes.bool,
  avoidKeyboard: PropTypes.bool,
  backdropOpacity: PropTypes.number
}

BottomSheetModal.defaultProps = {
  children: [],
  isVisible: false,
  isTopBar: true,
  closeModal: () => {},
  modalStyle: {},
  containerStyle: {},
  barStyle: {},
  isHeader: false,
  avoidKeyboard: false,
  backdropOpacity: 0.7,
  onClear: () => {}
}

export default React.memo(BottomSheetModal)
