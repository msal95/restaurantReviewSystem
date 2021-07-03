import React from 'react'
import propTypes from 'prop-types'
import { Button } from 'react-native-elements'
import { ViewPropTypes } from 'react-native'

import styles from './styles'

export default function FormButton(props) {
  const {onPress, title, loading, disabled, buttonContainer} = props;
  return (
    <Button
      loading={loading}
      disabled={loading || disabled}
      onPress={onPress}
      title={title}
      disabledStyle={styles.disabledButtonStyle}
      buttonStyle={[styles.buttonStyle, buttonContainer]}
     />
  );
}

FormButton.propTypes = {
  onPress: propTypes.func,
  title: propTypes.string,
  iconName: propTypes.string,
  loading: propTypes.bool,
  buttonContainer: ViewPropTypes.style,
};
FormButton.defaultProps = {
  onPress: () => {},
  title: '',
  iconName: '',
  loading: false,
  buttonContainer: {},
};
