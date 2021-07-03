import { StyleSheet } from 'react-native'

import { Colors, Fonts, Metrics } from '../../Themes'

export default StyleSheet.create({
  heading: {
    fontSize: Fonts.size.mediumII,
    color: Colors.blue,
    textTransform: 'uppercase',
    marginTop: Metrics.small,
  },
  listItemContainer: {
    padding: 0,
    paddingVertical: Metrics.base,
    alignItems: 'flex-start',
  },
  actionButton: {width: Metrics.twoHundred, flexDirection: 'row'},
  listItemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  userTitle: {flex:1},
  seeMore: {
    color: Colors.blue,
    fontSize: Fonts.size.mediumII,
  },
  replyContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.cloud,
    marginVertical: Metrics.small,
    marginLeft: Metrics.doubleBase,
  },
  replyText: {
    fontSize: Fonts.size.small,
    color: Colors.blue,
    marginTop: Metrics.small,
    marginLeft: Metrics.base,
  },
  replyUserImage: {
    marginVertical: Metrics.small,
    flexDirection: 'row',
    alignItems: 'center',
  },
  replyDescription: {
    flexShrink: 1,
    fontSize: Fonts.size.small,
    color: Colors.border,
    marginHorizontal: Metrics.base,
  },
});
