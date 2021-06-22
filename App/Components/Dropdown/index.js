import React, { useState } from 'react'
import RNPickerSelect from 'react-native-picker-select'
import { Text } from 'react-native'
import styles from './styles'

export const Dropdown = () => {
  const [isRole, selectIsRole] = useState('Regular User')
  return (
    <RNPickerSelect
      placeholder={{label: 'Regular User', value: 'Regular User'}}
      onValueChange={(value) => selectIsRole(value)}
      items={[
        { label: 'Owner', value: 'Owner' },
        { label: 'Admin', value: 'Admin' }
      ]}
      value={isRole}
    >
      <Text style={styles.selectedOpt}>{isRole}</Text>
    </RNPickerSelect>
  )
}
