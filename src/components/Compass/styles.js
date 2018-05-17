import { StyleSheet } from 'react-native'
import screen from '../../helpers/ScreenSize'


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    height: screen.height
  },
  center: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: screen.width,
    paddingTop: 40
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
    }
});

export default styles
