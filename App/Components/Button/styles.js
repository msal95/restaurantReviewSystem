import {StyleSheet} from 'react-native';

import {Colors, Fonts, Metrics} from '../../Themes';

export default StyleSheet.create({
  buttonStyle: {
    marginHorizontal: Metrics.base,
  },
  disabledButtonStyle: {
    backgroundColor: Colors.blueI
  },
  buttonTitle: {
    color: Colors.white,
    fontSize: Fonts.size.medium1,
    marginRight: Metrics.base,
  },
});
