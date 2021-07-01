import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes'

export default styles = StyleSheet.create({

  rectButtonContainer: {
    flex: 1,
    backgroundColor:'red'
  },
  rightAction: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 5
  },
  deleteActionButton: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  },
  container: {
    flexDirection: 'row',
    borderBottomColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20
  }
})
