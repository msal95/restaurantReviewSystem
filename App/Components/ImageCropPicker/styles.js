import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../Themes';

export default StyleSheet.create({
  imageContainer: {
    alignSelf: 'center',
    marginVertical: Metrics.fifteen,
    backgroundColor: Colors.frost,
  },
  bottomSheet: {
    backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)',
  },
});
