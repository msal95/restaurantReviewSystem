import {StyleSheet} from 'react-native';

import {Colors, Fonts, Metrics} from '../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cloud,
  },
  innerContainer: {
    flex: 1,
  },
  restaurantBanner: {
    width: '100%',
    height: Metrics.twoHundred,
    resizeMode: 'cover',
  },
  headingText: {
    textAlign: 'center',
    marginVertical: Metrics.doubleSection,
  },
  descriptionTitle: {
    marginTop: Metrics.doubleBaseMargin,
    fontWeight: 'bold',
    fontSize: Fonts.size.medium1,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.cloud,
  },
  reviewsTitle: {
    marginVertical: Metrics.doubleBaseMargin,
    fontWeight: 'bold',
    fontSize: Fonts.size.medium1,
  },
  separator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 0.5,
    borderTopColor: Colors.cloud,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.cloud,
    alignItems: 'center',
  },
  description: {
    lineHeight: Metrics.twentyTwo,
    marginVertical: Metrics.doubleBaseMargin,
    fontSize: Fonts.size.medium,
    justifyContent: 'center',
  },
  containerInputStyle: {
    height: Metrics.hundred,
  },
  rating: {
    marginVertical: Metrics.doubleBaseMargin,
  },
  cardContainer: {
    margin: 0,
    flex: 1,
  },
  visitDateContainer: {
    marginHorizontal: Metrics.base,
    marginBottom: Metrics.doubleBaseMargin,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  visitDateTitle: {
    fontSize: Fonts.size.input,
    fontWeight: 'bold',
    paddingBottom: Metrics.base,
  },
  commentHeading: {
    marginTop: Metrics.fifteen,
    marginHorizontal: Metrics.base,
  },
  reviewContainer: {
    backgroundColor: 'white',
  },
  flatListHeader: {
    backgroundColor: Colors.white,
    padding: 10,
  },
});
