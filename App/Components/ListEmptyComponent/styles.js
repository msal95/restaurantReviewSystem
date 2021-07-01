import {StyleSheet} from 'react-native';
import {Metrics} from '../../Themes';

export default StyleSheet.create({
  container: {
    paddingTop: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
  },
  message: {
    paddingVertical: Metrics.doubleBaseMargin,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
