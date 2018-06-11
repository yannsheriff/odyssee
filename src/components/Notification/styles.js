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
        width: screen.width / 100 * 90,
        marginTop: screen.height / 100 * 21,
        fontFamily: "Infini-Regular",
        fontSize: 35,
        lineHeight: 43,
        color: 'white',
        textAlign: 'center',
    },
    subtitle: {
        fontFamily: "Infini-Regular",
        width: screen.width / 100 * 60,
        marginTop: screen.height / 100 * 38,
        fontSize: 30,
        color: 'white',
        textAlign: 'center',
    },
    subtitle2: {
        fontFamily: "Infini-Regular",
        width: screen.width / 100 * 60,
        fontSize: 16,
        marginTop: 10,
        color: 'white',
        textAlign: 'center',
    },
    animation: {
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
