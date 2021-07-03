import {StyleSheet} from 'react-native';

import {Colors, Metrics} from '../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  profileContainer: {
    marginVertical: Metrics.fifteen,
  },
  profileImage: {
    alignSelf: 'center',
    marginTop: -Metrics.oneHundredFifty / 2,
    resizeMode: 'cover',
    width: Metrics.oneHundredFifty,
    height: Metrics.oneHundredFifty,
    borderRadius: Metrics.oneHundredFifty / 2,
    marginBottom: Metrics.fifteen,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: Metrics.seven,
  },
  userTitle: {
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Metrics.doubleBase,
    paddingVertical: Metrics.base,
  },
  profileInfoContainer: {
    backgroundColor: Colors.white,
    paddingBottom: Metrics.doubleBase,
  },
  userInfo: {
    marginLeft: Metrics.small,
  },
  image: {
    height: Metrics.twoHundred,
    width: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  buttonContainer: {
    backgroundColor: Colors.red,
    width: Metrics.oneHundredFifty,
    alignSelf: 'center',
    top: Metrics.section,
  },
  button: {
    backgroundColor: Colors.red,
  },
});
