import React from 'react'
import styles from './styles'
import { Button } from 'react-native-elements'
import propTypes from 'prop-types'

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

FormButton.propTypes = {
  onPress: propTypes.func,
  title: propTypes.string
}
FormButton.defaultProps = {
  onPress: () => {},
  title: ''
}
