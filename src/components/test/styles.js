import { StyleSheet } from 'react-native'
import screen from '../../helpers/ScreenSize'


const styles = StyleSheet.create({
    container: {
        width: screen.width,
        height: screen.height,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#fff',
    },
    absolute: {
        width: screen.width,
        height: screen.height,
        position: "absolute",
        top: 0, 
        left: 0
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
