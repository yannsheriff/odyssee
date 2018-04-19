import { StyleSheet } from 'react-native'
import screen from '../../helpers/ScreenSize'


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 40,
        
    },
    center: {
        flexDirection: 'column',
        justifyContent: 'center',
        width: screen.width
    },
    compassContainer: {
        position: 'absolute',
        left: 0,
        top: 370
    },
    compass: {
        width: screen.width,
        resizeMode: 'contain',
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
