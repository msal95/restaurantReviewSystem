import { StyleSheet } from 'react-native'

import { Colors, Fonts, Metrics } from '../../Themes'

export default StyleSheet.create({
  inputLabel: {
    color: Colors.panther,
    fontSize: Fonts.size.input,
  },
  datePicker: {
    width: Metrics.screenWidth - Metrics.section
  },
})
