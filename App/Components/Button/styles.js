import {StyleSheet} from 'react-native';

import {Colors, Fonts, Metrics} from '../../Themes';

export default StyleSheet.create({
  buttonStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.blue,
    borderRadius: Metrics.base,
    paddingVertical: Metrics.base,
  },
  buttonTitle: {
    color: Colors.white,
    fontSize: Fonts.size.medium1,
    marginRight: Metrics.base,
  },
});
