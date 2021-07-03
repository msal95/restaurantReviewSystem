import { Image, Text, View } from 'react-native'
import Modal from 'react-native-modal'
import React, { forwardRef, useMemo } from 'react'
import PropTypes from 'prop-types'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button } from 'react-native-elements'

import styles from './styles'
import { Images, Metrics as MetricsMod } from '../../Themes'

const ConfirmationModal = forwardRef((props, ref) => {
  const {
    isVisible,
    closeModal,
    image = Images.delete,
    onPressCancel,
    onPressDone,
    doneText,
    cancelText,
    header,
    subHeader,
    containerStyle,
    buttonsContainerStyle,
    children,
    isDoneButton,
    isCancelButton,
    isTranslated,
    isVerticalButtons,
    imageStyle,
    headerStyle,
    subHeaderStyle,
  } = props

  const _renderImage = useMemo(
    () =>
      image ? (
        <Image source={image} style={[styles.smallImage, imageStyle]}/>
      ) : null,
    [image],
  )

  const _renderHeader = useMemo(
    () =>
      header ? (
        <Text style={[styles.header, headerStyle]}>
          {!isTranslated ? header : header}
        </Text>
      ) : null,
    [header, isTranslated],
  )

  const _renderSubHeader = useMemo(
    () =>
      subHeader ? (
        <Text style={[styles.subHeader, subHeaderStyle]}>
          {!isTranslated ? subHeader : subHeader}
        </Text>
      ) : null,
    [subHeader, isTranslated],
  )

  const _renderCancelButton = useMemo(() => {
    if (isCancelButton) {
      return (
        <Button
          title={cancelText}
          onPress={onPressCancel}
          type="outline"
          buttonStyle={styles.buttonStyle}
        />
      )
    }
    return null
  }, [isCancelButton, cancelText, onPressCancel])

  const _renderDoneButton = useMemo(() => {
    if (isDoneButton) {
      return (
        <Button
          title={doneText}
          onPress={onPressDone}
          buttonStyle={styles.buttonStyle}
        />
      )
    }
    return null
  }, [isDoneButton, doneText, onPressDone])

  return (
    <Modal
      isVisible={isVisible}
      onRequestClose={closeModal}
      onBackdropPress={closeModal}
      animationType="slide"
      style={styles.modal}>
      <View>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[styles.contentContainerStyle, containerStyle]}
          extraHeight={MetricsMod.hundred}>
          {_renderImage}
          {_renderHeader}
          {_renderSubHeader}
          {children}
          <View
            style={[
              styles.actionButtonsContainer,
              isVerticalButtons && styles.verticalButtonsContainer,
              buttonsContainerStyle,
            ]}>
            {_renderCancelButton}
            {_renderDoneButton}
          </View>
        </KeyboardAwareScrollView>
      </View>
    </Modal>
  )
})

const arePropsEqual = (prevProps, nextProps) =>
  prevProps.isVisible === nextProps.isVisible &&
  prevProps.children === nextProps.children &&
  prevProps.isTranslated === nextProps.isTranslated &&
  prevProps.image === nextProps.image &&
  prevProps.subHeader === nextProps.subHeader &&
  prevProps.doneText === nextProps.doneText &&
  prevProps.cancelText === nextProps.cancelText &&
  prevProps.isDoneButton === nextProps.isDoneButton &&
  prevProps.isCancelButton === nextProps.isCancelButton

export default React.memo(ConfirmationModal, arePropsEqual)

ConfirmationModal.propTypes = {
  isVisible: PropTypes.bool,
  isVerticalButtons: PropTypes.bool,
  isTranslated: PropTypes.bool,
  closeModal: PropTypes.func,
  image: PropTypes.number,
  header: PropTypes.string,
  subHeader: PropTypes.string,
  onPressDone: PropTypes.func,
  onPressCancel: PropTypes.func,
  containerStyle: PropTypes.object,
  buttonsContainerStyle: PropTypes.object,
  modalStyle: PropTypes.object,
  cancelButtonStyle: PropTypes.object,
  doneButtonStyle: PropTypes.object,
  imageStyle: PropTypes.object,
  doneText: PropTypes.string,
  cancelText: PropTypes.string,
  isDoneButton: PropTypes.bool,
  isCancelButton: PropTypes.bool,
}

ConfirmationModal.defaultProps = {
  isVisible: false,
  isVerticalButtons: false,
  subButton: false,
  isDoneButton: true,
  isCancelButton: true,
  isTranslated: false,
  body: [],
  doneText: 'Remove',
  cancelText: 'Cancel',
  closeModal: () => {},
  onPressDone: () => {},
  onPressCancel: () => {},
  containerStyle: {},
  buttonsContainerStyle: {},
  cancelButtonStyle: {},
  modalStyle: {},
  doneButtonStyle: {},
  imageStyle: {},
}
