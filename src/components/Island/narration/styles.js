import { StyleSheet } from 'react-native'
import screen from '../../../helpers/ScreenSize'


const styles = StyleSheet.create({
    container: {
        width: screen.width,
        height: 300,
        backgroundColor: '#ffffff'
        
    },
    center: {
        flexDirection: 'column',
        justifyContent: 'center',
        width: screen.width
    },
    text: {
        color: 'black',
        textAlign: 'center',
    },
    safeArea: {
        flex: 1,
      }
});

export default styles
