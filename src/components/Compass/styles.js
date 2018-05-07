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
      left: 20
    },
    compassContainer: {
        position: 'absolute',
        left: 0,
        top: 415,
        width: screen.width
    },
    compass: {
        width: screen.width,
        resizeMode: 'center'
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
