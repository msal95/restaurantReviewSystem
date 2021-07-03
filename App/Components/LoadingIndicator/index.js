import React from 'react'
import propTypes from 'prop-types'
import { ActivityIndicator, View } from 'react-native'

import { Colors } from '../../Themes'
import styles from './styles'

export default function LoadingIndicator (props) {
  const { loading } = props

  if (!loading) {
    return null
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={Colors.blue}/>
    </View>
  )
}

LoadingIndicator.propTypes = {
  loading: propTypes.bool,
}
LoadingIndicator.defaultProps = {
  loading: false,
}
