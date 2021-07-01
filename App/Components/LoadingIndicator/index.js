import React from 'react';
import styles from './styles';
import {Button} from 'react-native-elements';
import propTypes from 'prop-types';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Colors} from '../../Themes';

export default function LoadingIndicator(props) {
  const {loading} = props;

  if (!loading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={Colors.blue} />
    </View>
  );
}

LoadingIndicator.propTypes = {
  loading: propTypes.bool,
};
LoadingIndicator.defaultProps = {
  loading: false,
};
