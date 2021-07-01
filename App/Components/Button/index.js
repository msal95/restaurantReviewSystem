import React from 'react';
import styles from './styles';
import {Button} from 'react-native-elements';
import propTypes from 'prop-types';

export default function FormButton(props) {
  const {onPress, title, loading, disabled} = props;
  return (
    <Button
      loading={loading}
      title={title}
      disabled={loading || disabled}
      onPress={onPress}
      buttonStyle={styles.buttonStyle}
    />
  );
}

FormButton.propTypes = {
  onPress: propTypes.func,
  title: propTypes.string,
  loading: propTypes.bool,
};
FormButton.defaultProps = {
  onPress: () => {},
  title: '',
  loading: false,
};
