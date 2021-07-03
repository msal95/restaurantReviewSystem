import {StyleSheet} from 'react-native';

import {Colors, Metrics} from '../../Themes';
import Fonts from '../../Themes/Fonts';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: Metrics.fifteen,
    marginTop: Metrics.fifteen,
  },
  container: {
    flex: 1,
  },
  headingText: {
    textAlign: 'center',
    marginVertical: Metrics.doubleSection,
  },
  signUpText: {
    color: Colors.panther,
    borderBottomWidth: 1,
    borderBottomColor: Colors.panther,
  },
  msgText: {
    textAlign: 'center',
    marginVertical: Metrics.fifteen,
    color: Colors.charcoal,
    marginHorizontal: Metrics.base,
  },
  establishedDate: {
    marginHorizontal: Metrics.base,
    marginBottom: Metrics.doubleBase,
  },
  dateTitle: {
    fontSize: Fonts.size.input,
    fontWeight: 'bold',
    paddingBottom: Metrics.base,
  },
  radioButton: {
    backgroundColor: Colors.silver,
  },
  dateError: {
    marginHorizontal: 0,
    top: 5,
  },
  dateContainer: {
    width: Metrics.screenWidth - Metrics.forty,
  },
});
