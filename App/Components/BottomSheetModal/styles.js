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
    width: Metrics.fortyFive,
    height: Metrics.small,
    alignSelf: 'center',
    marginVertical: Metrics.base,
    backgroundColor: Colors.steel,
    borderRadius: Metrics.doubleSection,
  },
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingHorizontal: Metrics.fifteen,
    borderBottomColor: Colors.steel,
    marginBottom: Metrics.eight,
    paddingBottom: Metrics.fifteen,
  },
  headerTextStyle: {
    flex: 1,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: Metrics.eighteen,
  },
  rightButton: {
    position: 'absolute',
    right: Metrics.fifteen,
    top: 0,
  },
  buttonsText: {
    color: 'red',
    fontSize: Metrics.eighteen,
  }
});

export default styles;
