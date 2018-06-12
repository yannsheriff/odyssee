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
      width: 175,
      height: 380,
      left: (screen.width / 2) - 87.5,
      top: (screen.height / 2) - 190
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
      top: 50,
      right: 40,
      width: 35,
      height: 35
    },
    iconBurger: {
      width: 35,
      height: 35
    },
    iconImage: {
      width: 40,
      height: 40
    },
    windAnim: {
      position: 'absolute',
      left: (screen.width / 2) - (Math.sqrt(Math.pow(screen.width, 2) + Math.pow(screen.height, 2)) / 2) - 50,
      top: (screen.height / 2) - (Math.sqrt(Math.pow(screen.width, 2) + Math.pow(screen.height, 2)) / 2) - 50,
      width: Math.sqrt(Math.pow(screen.width, 2) + Math.pow(screen.height, 2)) + 100,
      height: Math.sqrt(Math.pow(screen.width, 2) + Math.pow(screen.height, 2)) + 100
    },
    seagulls: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: screen.width,
      height: screen.height
    },
    activeGlyph: {
      position: 'absolute',
      left: (screen.width / 2) - 20,
      top: screen.height - (screen.width / 2) - 20,
      width: 50,
      height: 50
    },
    glyph: {
      width: 50,
      height: 50
    }
  });

export default styles
  