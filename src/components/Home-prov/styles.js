import { StyleSheet } from 'react-native'
import screen from '../../helpers/ScreenSize'


const styles = StyleSheet.create({
    container: {
        width: screen.width,
        height: screen.height,
        backgroundColor: '#fff'
    },
    background: {
        position: 'absolute',
        top: 60, 
        left: 0,
        width: screen.width,
        height: screen.height,
    },
    center: {
        marginTop: 400
    }    
});

export default styles
