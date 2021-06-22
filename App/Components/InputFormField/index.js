import React from 'react'
import { Input } from 'react-native-elements'
import PropTypes from 'prop-types'

import styles from './styles'

export default function InputFormField (props) {
  const {
    onSelect,
    selectedOption,
    inputRef,
    onSubmitEditing,
    returnKeyType,
    keyboardType,
    secureTextEntry,
    label,
    placeholder
  } = props
  return (
    <Input
      label={label}
      placeholder={placeholder}
      labelStyle={styles.inputLabel}
      value={selectedOption}
      onChangeText={onSelect}
      keyboardType={keyboardType}
      onSubmitEditing={onSubmitEditing}
      returnKeyType={returnKeyType}
      secureTextEntry={secureTextEntry}
      ref={inputRef}
    />
  )
}

InputFormField.PropTypes = {
  onSelect: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  selectedOption: PropTypes.string,
  onSubmitEditing: PropTypes.func,
  returnKeyType: PropTypes.string,
  keyboardType: PropTypes.string,
  secureTextEntry: PropTypes.bool
}
InputFormField.defaultProps = {
  onSelect: '',
  selectedOption: '',
  label: '',
  placeholder: '',
  onSubmitEditing: () => {},
  returnKeyType: '',
  keyboardType: 'default',
  secureTextEntry: false
}
