import React from 'react';
import {Text, View} from 'react-native';
import ContentLoader, {Facebook} from 'react-content-loader/native';

import styles from './styles';
import {Strings} from '../../Themes/Strings';

function ListEmptyComponent(props) {
  if (props?.loading) {
    return (
      <View style={styles.container}>
        <Facebook backgroundColor="#FFFFFF" />
        <Facebook backgroundColor="#FFFFFF" />
        <Facebook backgroundColor="#FFFFFF" />
        <Facebook backgroundColor="#FFFFFF" />
        <Facebook backgroundColor="#FFFFFF" />
        <Facebook backgroundColor="#FFFFFF" />
      </View>
    );
  }

  return (
    <Text style={styles.message}>
      {props?.message ?? Strings.noRecordFound}
    </Text>
  );
}

export default ListEmptyComponent;
