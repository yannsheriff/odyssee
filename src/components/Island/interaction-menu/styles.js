import { StyleSheet } from 'react-native'
import screen from '../../../helpers/ScreenSize'


const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
    },
    menu: {
        width: screen.width,
        height: 30,
        marginBottom: 40,
        flexDirection: 'row',
        justifyContent: 'center',
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
    swipReconizer: {
        width: screen.width,
        height: 300,
        position: "absolute",
        bottom: 0,
        zIndex: 50,
        backgroundColor: "red",
        opacity: 0.3
    }
});

export default styles
