import React from 'react'
import { Input } from 'react-native-elements'
import DatePicker from 'react-native-datepicker'
import propTypes from 'prop-types'

import styles from './styles'
import { ViewPropTypes } from 'react-native'

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
    placeholder,
    dateTime,
    inputContainerStyle
  } = props

  if (dateTime) {
    return (
      <DatePicker
        style={styles.datePicker}
        date={selectedOption}
        mode='date'
        placeholder={placeholder}
        format='YYYY-MM-DD'
        confirmBtnText='Confirm'
        cancelBtnText='Cancel'
        onDateChange={onSelect}

      />
    )
  }

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
      inputContainerStyle={inputContainerStyle}
    />
  )
}

InputFormField.propTypes = {
  onSelect: propTypes.func,
  label: propTypes.string,
  placeholder: propTypes.string,
  selectedOption: propTypes.string,
  onSubmitEditing: propTypes.func,
  returnKeyType: propTypes.string,
  keyboardType: propTypes.string,
  secureTextEntry: propTypes.bool,
  dateTime: propTypes.bool,
  inputContainerStyle: ViewPropTypes.style
}
InputFormField.defaultProps = {
  onSelect: () => {},
  selectedOption: '',
  label: '',
  placeholder: '',
  onSubmitEditing: () => {},
  returnKeyType: '',
  keyboardType: 'default',
  secureTextEntry: false,
  dateTime: false,
  inputContainerStyle: {}
}
