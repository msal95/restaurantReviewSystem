import React from 'react';
import styles from './styles';
import propTypes from 'prop-types';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Text, TouchableOpacity, ViewPropTypes} from 'react-native';

import {Colors} from '../../Themes';

export default function FormButton(props) {
  const {onPress, title, loading, disabled, iconName, buttonContainer} = props;
  return (
    <TouchableOpacity
      loading={loading}
      disabled={loading || disabled}
      onPress={onPress}
      style={[styles.buttonStyle, buttonContainer]}>
      <Text style={styles.buttonTitle}>{title}</Text>
      {!!iconName && (
        <AntDesign name={iconName} size={20} color={Colors.white} />
      )}
    </TouchableOpacity>
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
