import React from 'react';
import {Text, View} from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';
import PropTypes from 'prop-types';

function BottomSheetModal(props) {
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
  } = props;
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
        {isTopBar && <View style={[styles.topBar, barStyle]} />}
        {isHeader && (
          <View style={styles.headerStyle}>
            <Text style={styles.headerTextStyle}>{headerText}</Text>
          </View>
        )}
        {children}
      </View>
    </Modal>
  );
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
  backdropOpacity: PropTypes.number,
};

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
};

export default React.memo(BottomSheetModal);
