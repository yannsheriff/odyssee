import Dimensions from 'Dimensions'
import { Platform } from 'react-native'

const screenSize = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    isSmall: Dimensions.get('window').height <= 568,
    isLarge: Dimensions.get('window').height >= 812,
    halfHeight: Dimensions.get('window').height / 2,
    percent: Dimensions.get('window').height / 100,
    isAndroid: Platform.OS === 'android'
  }
  
export default screenSize