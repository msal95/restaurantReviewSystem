import {StyleSheet} from 'react-native';

import {Colors, Metrics} from '../../Themes';
import Fonts from '../../Themes/Fonts';

export default StyleSheet.create({
  container: {
    padding: 0,
  },
  image: {
    width: Metrics.oneHundredFive,
    height: Metrics.oneHundredTen,
  },
  title: {
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemsInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: Metrics.base,
  },
  infoDateText: {
    fontStyle: 'italic',
    fontSize: Fonts.size.small,
  },
  infoDate: {
    flex: 1,
  },
  iconStyle: {
    color: Colors.blue,
    fontSize: Fonts.size.large,
    padding: 0,
  },
  filterIconContainer: {
    width: Metrics.thirty,
    height: Metrics.thirty,
    marginHorizontal: Metrics.base,
  },
  filterIcon: {
    position: 'absolute',
    backgroundColor: 'red',
    top: -Metrics.small,
    right: Metrics.small,
    height: Metrics.base,
    width: Metrics.base,
    borderRadius: Metrics.base / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersButton: {
    backgroundColor: Colors.white,
    marginHorizontal: Metrics.doubleBase,
  },
});
