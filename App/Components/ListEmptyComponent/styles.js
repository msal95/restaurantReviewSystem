import {StyleSheet} from 'react-native';

import {Metrics} from '../../Themes';

export default StyleSheet.create({
  container: {
    paddingTop: Metrics.doubleBase,
    paddingHorizontal: Metrics.doubleBase,
  },
  message: {
    paddingVertical: Metrics.doubleBase,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
