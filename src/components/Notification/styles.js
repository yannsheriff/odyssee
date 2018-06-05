import { StyleSheet } from 'react-native'
import screen from '../../helpers/ScreenSize'


const styles = StyleSheet.create({
    container: {
        width: screen.width,
        height: screen.height,
        backgroundColor: 'rgba(000, 000, 000, 0.3)',
        // opacity: 0.7,
        position: "absolute",
        top: 0,
        left: 0,
        flexDirection: "column",
        alignItems: "center",
    },
    title: {
        width: screen.width / 100 * 60,
        marginTop: 120,
        fontFamily: "Infini-Regular",
        fontSize: 32,
        color: 'white',
        textAlign: 'center',
    },
    subtitle: {
        width: screen.width / 100 * 60,
        marginTop: 20,
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
    },
    animation: {
        marginTop: 20,
        position: "absolute",
        top: 0,
        width: screen.width,
        height: screen.height,
        // backgroundColor: "red"
    }, 
    absolute: {
        width: screen.width,
        height: screen.height,
        position: "absolute",
        top: 0, 
        left: 0
    },
    
});

export default styles
