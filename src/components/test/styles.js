import { StyleSheet } from 'react-native'
import screen from '../../helpers/ScreenSize'


const styles = StyleSheet.create({
    container: {
        width: screen.width,
        height: screen.height,
    },
    background: {
        backgroundColor: '#000',
        height: screen.height,
        width: screen.width
    },
    center: {
        marginTop: 400
    }
    
});

export default styles
