import {StyleSheet, Platform} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';

import {Colors, Metrics} from '../../Themes';

const bottomSpace = getBottomSpace();

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
    paddingTop: Metrics.eighty,
  },
  container: {
    borderTopLeftRadius: Metrics.fourty,
    borderTopRightRadius: Metrics.fourty,
    backgroundColor: Colors.white,
    overflow: 'hidden',
    paddingBottom: bottomSpace,
    minHeight: Metrics.twoHundred,
    marginTop: Metrics.twoHundred + bottomSpace,
  },
  topBar: {
    width: Metrics.fourtyFive,
    height: Metrics.small,
    alignSelf: 'center',
    marginVertical: Metrics.base,
    backgroundColor: Colors.silver,
    borderRadius: Metrics.doubleSection,
  },
  headerStyle: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    marginBottom: Metrics.eight,
  },
  headerTextStyle: {
    fontSize: Metrics.eighteen,
    fontWeight: Platform.OS === 'android' ? 'bold' : '600',
    color: Colors.white,
    marginBottom: Metrics.fifteen,
  },
});

export default styles;
