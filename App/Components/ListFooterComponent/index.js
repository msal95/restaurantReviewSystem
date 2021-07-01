import React from 'react';
import {View} from 'react-native';
import {Facebook} from 'react-content-loader/native';

import styles from '../ListEmptyComponent/styles';

function ListFooterComponent(props) {
  const {loading} = props;

  if (loading) {
    return (
      <View style={styles.container}>
        <Facebook backgroundColor="#FFFFFF" />
      </View>
    );
  }

  return null;
}

export default ListFooterComponent;
