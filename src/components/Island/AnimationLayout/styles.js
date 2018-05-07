import { StyleSheet } from 'react-native'
import screen from '../../../helpers/ScreenSize'


const styles = StyleSheet.create({
    container: {
        width: screen.width,
        height: screen.height,
    },
    background: {
        height: screen.height,
        width: screen.width,
        position:  "absolute",
        backgroundColor: "#34435E",
        top: 0
    },
    center: {
        marginTop: 400
    }
    
});

export default styles
