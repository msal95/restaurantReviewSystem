import { StyleSheet } from 'react-native'

import { Colors, Fonts, Metrics } from '../../Themes'

export default StyleSheet.create({
  swipeAbleContainer: {
    marginVertical: Metrics.small,
    marginHorizontal: Metrics.small,
    borderRadius: Metrics.base,
    borderWidth: 1,
    borderColor: Colors.cloud,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    overflow: 'hidden',
    elevation: Metrics.two,
  },
  rectButtonContainer: {
    flex: 1,
    backgroundColor: Colors.red,
  },
  rightAction: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: Fonts.size.small,
    fontWeight: '600',
    marginTop: Metrics.small,
  },
  deleteActionButton: {
    borderTopRightRadius: Metrics.base,
    borderBottomRightRadius: Metrics.base,
  },
  container: {
    flexDirection: 'row',
    borderBottomColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Metrics.doubleBase,
  },
})
