import {StyleSheet} from 'react-native'

import {Colors, Metrics} from '../../Themes'
import Fonts from '../../Themes/Fonts'

export default StyleSheet.create({
  container: {
    padding: 0
  },
  image: {
    width: Metrics.oneHundredFive,
    height: Metrics.oneHundredTen
  },
  title: {
    fontWeight: 'bold',
    justifyContent: 'center',
    paddingBottom: Metrics.small
  },
  itemContainer: {
    flex: 1,
    paddingVertical: Metrics.base,
    justifyContent: 'space-between'
  },
  itemsInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: Metrics.base
  },
  infoDateText: {
    fontStyle: 'italic',
    fontSize: Fonts.size.small
  },
  infoDate: {
    flex: 1
  },
  iconStyle: {
    color: Colors.blue,
    paddingRight: Metrics.small,
    fontSize: Fonts.size.large
  },
  filterIconContainer: {
    width: Metrics.thirty,
    height: Metrics.thirty,
    marginHorizontal: Metrics.base
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
    alignItems: 'center'
  },
  filtersButton: {
    backgroundColor: Colors.white,
    marginHorizontal: Metrics.doubleBase
  },
  emptyMessage: {
    textAlign: 'center',
    padding: Metrics.doubleBase
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20
  },
  radioLabel: {
    fontSize: Fonts.size.regular,
    paddingLeft: Metrics.doubleBase,
  },
  radioBtn: {
    paddingBottom: Metrics.base,
  }
})
