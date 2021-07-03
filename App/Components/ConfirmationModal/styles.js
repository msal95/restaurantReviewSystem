import { StyleSheet } from 'react-native'

import { Colors, Fonts, Metrics as MetricsMod } from '../../Themes'

export default StyleSheet.create({
  modal: {
    padding: MetricsMod.doubleBase,
    margin: 0,
  },
  container: {
    borderRadius: MetricsMod.fifteen,
    paddingVertical: MetricsMod.thirty,
    paddingHorizontal: MetricsMod.doubleBase,
  },
  contentContainerStyle: {
    justifyContent: 'center',
    borderRadius: MetricsMod.fifteen,
    paddingVertical: MetricsMod.thirty,
    paddingHorizontal: MetricsMod.doubleBase,
    backgroundColor: Colors.white,
  },
  buttonStyle: {
    minWidth: MetricsMod.hundred,
  },
  smallImage: {
    width: MetricsMod.seventyFive,
    height: MetricsMod.seventyFive,
    margin: MetricsMod.section,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  mediumImage: {
    width: MetricsMod.seventyFive,
    height: MetricsMod.seventyFive,
  },
  header: {
    textAlign: 'center',
    fontWeight: '400',
    fontSize: Fonts.size.h5,
    color: Colors.black,
    lineHeight: MetricsMod.thirty,
    letterSpacing: 0.2,
  },
  subHeader: {
    textAlign: 'center',
    fontWeight: '400',
    fontSize: Fonts.size.medium,
    color: Colors.black,
    lineHeight: MetricsMod.twentyTwo,
    marginTop: MetricsMod.base,
  },
  body: {
    flexGrow: 1,
    flexDirection: 'row',
    backgroundColor: Colors.cloud,
    borderRadius: MetricsMod.base,
    padding: MetricsMod.base,
    marginVertical: MetricsMod.base,
  },
  bodyIcon: {
    width: MetricsMod.thirty,
    height: MetricsMod.thirty,
    marginRight: MetricsMod.base,
    marginTop: MetricsMod.base,
    resizeMode: 'contain',
  },
  bodyHeading: {
    fontWeight: '700',
    textAlign: 'left',
    fontSize: Fonts.size.medium,
    color: Colors.background,
    lineHeight: MetricsMod.doubleBase,
    marginTop: MetricsMod.base,
    flexShrink: 1,
    letterSpacing: 0.33,
  },
  bodyText: {
    textAlign: 'left',
    fontSize: Fonts.size.medium,
    color: Colors.background,
    marginTop: MetricsMod.base,
    fontWeight: '300',
    flexShrink: 1,
  },
  bottomText: {
    textAlign: 'center',
    fontSize: Fonts.size.medium,
    color: Colors.black,
    lineHeight: MetricsMod.twentyTwo,
    marginTop: MetricsMod.base,
    fontWeight: '300',
  },
  buttonContainer: {
    marginVertical: 0,
  },
  verticalButtonsContainer: {
    flexDirection: 'column-reverse',
    minHeight: MetricsMod.seventyFive,
    justifyContent: 'space-between',
  },
  verticalButton: {
    alignSelf: 'auto',
    height: MetricsMod.thirty,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: MetricsMod.fifteen,
    marginTop: MetricsMod.twentyTwo,
  },
  alertMainContainer: {
    padding: 0,
    paddingTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: MetricsMod.forty,
    marginTop: MetricsMod.navBarHeight,
  },
  messageStyle: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: Fonts.size.medium,
    fontWeight: 'bold',
  },
  alertContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  checkIcon: {
    height: MetricsMod.fifteen,
    width: MetricsMod.fifteen,
    resizeMode: 'contain',
  },
})
