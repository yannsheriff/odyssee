import { StyleSheet } from 'react-native'
import screen from '../../helpers/ScreenSize'
  

const styles = StyleSheet.create({
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
      color: '#fff'
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
    boat: {
      position: 'absolute',
      width: 400,
      height: 600,
      left: (screen.width / 2) - 200,
      top: (screen.height / 2) - 300
    },
    container: {
      position: 'relative',
      top: 0,
      height: screen.height
    },
    navtools: {
      position: 'absolute',
      top: 50,
      left: 50
    },
    outerCompassContainer: {
      position: 'absolute',
      top: screen.height - ((screen.width - 100) / 2),
      width: screen.width - 100,
      height: screen.width - 100,
      left: 50
    },
    compassContainer: {
      position: 'absolute',
      left: 50,
      top: screen.height - ((screen.width - 100) / 2),
      width: screen.width - 100,
      height: screen.width - 100
    },
    compass: {
      width: screen.width - 100,
      height: screen.width - 100,
      resizeMode: 'contain'
    },
    pointer: {
      width: screen.width - 100,
      height: screen.width - 100,
      resizeMode: 'contain'
    },
    text: {
      color: '#ffffff50',
      textAlign: 'center',
    },
    safeArea: {
      flex: 1,
      backgroundColor: '#fff'
    },
    icon: {
      position: 'absolute',
      width: 40,
      height: 40
    },
    iconLeft: {
      left: 40,
      top: screen.height - ((screen.width - 100) / 2) - 17
    },
    iconRight: {
      right: 40,
      top: screen.height - ((screen.width - 100) / 2) - 17
    },
    iconTop: {
      right: 10,
      top: 40
    },
    iconImage: {
      width: 40,
      height: 40
    }
  });

export default styles
  