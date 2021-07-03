import { Dimensions, Platform } from 'react-native'

const { width, height } = Dimensions.get('window')

const metrics = {
  two: 2,
  three: 3,
  seven: 7,
  eight: 8,
  base: 10,
  fifteen: 15,
  eighteen: 18,
  section: 25,
  doubleBase: 20,
  small: 5,
  twentyTwo: 22,
  thirty: 30,
  fourty: 30,
  doubleSection: 50,
  forty: 40,
  fortyFive: 45,
  fiftyFive: 55,
  seventyFive: 75,
  eighty: 80,
  hundred: 100,
  oneHundredFive: 105,
  oneHundredTen: 110,
  oneHundredFifty: 150,
  twoHundred: 200,
  twoSeventy: 270,
  threeHundred: 300,
  horizontalLineHeight: 1,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: Platform.OS === 'ios' ? 64 : 54,
  buttonRadius: 4,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 50,
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 200,
  },
}

export default metrics
