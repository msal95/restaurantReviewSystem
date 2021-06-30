import {StyleSheet} from 'react-native';

import {Colors, Metrics} from '../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  profileContainer: {
    marginVertical: Metrics.fifteen,
  },
  profileImage: {
    alignSelf: 'center',
    marginBottom: Metrics.fifteen,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 7,
  },
  userTitle: {
    top: 80,
    textAlign: 'center',
  },
  profileInfoContainer: {
    backgroundColor: Colors.white,
    height: 300,
    position: 'absolute',
    top: 100,
    width: '100%',
  },
  userDetails: {
    marginTop: '30%',
  },
  userInfo: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
