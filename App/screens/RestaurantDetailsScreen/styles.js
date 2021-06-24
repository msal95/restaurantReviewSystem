import { StyleSheet } from 'react-native'

import { Colors, Fonts, Metrics } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cloud
  },
  restaurantBanner: {
    width: '100%',
    height: Metrics.twoHundred
  },
  headingText: {
    textAlign: 'center',
    marginVertical: Metrics.doubleSection
  },
  description: {
    lineHeight: Metrics.twentyTwo,
    marginVertical: Metrics.doubleBaseMargin,
    fontSize: Fonts.size.medium,
    justifyContent: 'center'
  },
  containerInputStyle: {
    height: Metrics.hundred
  },
  rating: {
    marginVertical: Metrics.doubleBaseMargin
  },
  cardContainer: {
    margin: 0
  }
})
