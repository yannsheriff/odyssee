import { StyleSheet } from 'react-native'
import screen from '../../helpers/ScreenSize'


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 40
    },
    center: {
        flexDirection: 'column',
        justifyContent: 'center',
        width: screen.width
    },
    outerCompassContainer: {
      position: 'absolute',
      top: 184,
      width: screen.width - 100,
      left: 50
    },
    compassContainer: {
        position: 'absolute',
        left: 50,
        top: 184,
        width: screen.width - 100,
    },
    compass: {
        width: screen.width - 100,
        resizeMode: 'contain'
    },
    pointer: {
        width: screen.width - 100,
        resizeMode: 'contain'
    },
    text: {
        color: '#ffffff50',
        textAlign: 'center'
    }
})

export default styles
