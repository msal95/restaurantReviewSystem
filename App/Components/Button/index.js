import React from 'react'
import styles from './styles'
import { Button } from 'react-native-elements'
import PropTypes from 'prop-types'

export default function FormButton (props) {
  const {
    onPress,
    title,
  } = props
  return (
    <Button
      title={title}
      onPress={onPress}
      buttonStyle={styles.buttonStyle}
    />
  )
}

FormButton.PropTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string
}
FormButton.defaultProps = {
  onPress: () => {},
  title: ''
}
