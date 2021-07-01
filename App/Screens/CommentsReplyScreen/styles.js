import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics} from '../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cloud,
  },
  restaurantBanner: {
    width: '100%',
    height: Metrics.twoHundred,
  },
  headingText: {
    textAlign: 'center',
    marginVertical: Metrics.doubleSection,
  },
  description: {
    lineHeight: Metrics.twentyTwo,
    marginVertical: Metrics.doubleBaseMargin,
    fontSize: Fonts.size.medium,
    justifyContent: 'center',
  },
  h4Style: {
    marginVertical: Metrics.doubleBaseMargin,
  },
  containerInputStyle: {
    margin: 0,
  },
  cardContainer: {
    margin: 0,
  },
  rating: {
    marginVertical: Metrics.doubleBaseMargin,
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
});