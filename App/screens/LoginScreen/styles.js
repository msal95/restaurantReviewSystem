import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes'

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: Metrics.fifteen
  },
  headingText: {
    textAlign: 'center',
    marginVertical: Metrics.doubleSection,
  },
  signUpText: {
    color: Colors.panther,
    borderBottomWidth: 1,
    borderBottomColor: Colors.panther
  },
  msgText: {
    textAlign: 'center',
    marginVertical: Metrics.doubleSection,
    color: Colors.charcoal,
    marginHorizontal: Metrics.base
  }
})
