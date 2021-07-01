import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../Themes';
import Fonts from '../../Themes/Fonts';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: Metrics.fifteen,
    marginTop: Metrics.fifteen,
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
  roleSelection: {
    marginHorizontal: Metrics.base,
    marginBottom: Metrics.doubleBaseMargin,
  },
  roleText: {
    fontSize: Fonts.size.input,
    fontWeight: 'bold',
    paddingBottom: Metrics.base,
  },
  radioButton: {
    backgroundColor: Colors.silver,
  },
  selectedOpt: {
    fontSize: Fonts.size.regular,
  },
  radioBtn: {
    fontSize: Fonts.size.regular,
    paddingHorizontal: Metrics.doubleBaseMargin,
  },
  errorMessage: {
    marginBottom: 20,
  },
});
