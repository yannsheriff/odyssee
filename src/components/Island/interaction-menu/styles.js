import { StyleSheet } from 'react-native'
import screen from '../../../helpers/ScreenSize'


const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
    },
    absolute: {
        width: screen.width,
        height: 10,
        position: "absolute",
        top: 0, 
        left: 0
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
        height: screen.height,
        position: "absolute",
        top: 0,
    }
});

export default styles
