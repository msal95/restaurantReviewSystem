import Fonts from './Fonts';
import Metrics from './Metrics';
import Colors from './Colors';

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  screen: {
    mainContainer: {
      flex: 1,
      backgroundColor: Colors.transparent,
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    container: {
      flex: 1,
      paddingTop: Metrics.base,
      backgroundColor: Colors.transparent,
    },
    section: {
      margin: Metrics.section,
      padding: Metrics.base,
    },
    sectionText: {
      ...Fonts.style.normal,
      paddingVertical: Metrics.doubleBase,
      color: Colors.snow,
      marginVertical: Metrics.small,
      textAlign: 'center',
    },
    subtitle: {
      color: Colors.snow,
      padding: Metrics.small,
      marginBottom: Metrics.small,
      marginHorizontal: Metrics.small,
    },
    titleText: {
      ...Fonts.style.h2,
      fontSize: 14,
      color: Colors.text,
    },
  },
  darkLabelContainer: {
    padding: Metrics.small,
    paddingBottom: Metrics.doubleBase,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
    marginBottom: Metrics.base,
  },
  darkLabel: {
    fontFamily: Fonts.type.bold,
    color: Colors.snow,
  },
  groupContainer: {
    margin: Metrics.small,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  sectionTitle: {
    ...Fonts.style.h4,
    color: Colors.coal,
    backgroundColor: Colors.ricePaper,
    padding: Metrics.small,
    marginTop: Metrics.small,
    marginHorizontal: Metrics.base,
    borderWidth: 1,
    borderColor: Colors.ember,
    alignItems: 'center',
    textAlign: 'center',
  },
};

export default ApplicationStyles;
