import { StyleSheet } from 'react-native'

import { Colors, Metrics } from '../../Themes'
import Fonts from '../../Themes/Fonts'

export default StyleSheet.create({
  container: {
    padding: Metrics.small
  },
  avatarStyle: {
    resizeMode: 'cover'
  },
  title: {
    fontWeight: 'bold',
    justifyContent: 'center'
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'space-between'
  },
  itemsInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: Metrics.small
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
    fontSize: Fonts.size.large
  },
  infoDatePhone: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  phoneText: {
    fontSize: Fonts.size.small
  }
})
