import { StyleSheet } from 'react-native'
import screen from '../../../helpers/ScreenSize'


const styles = StyleSheet.create({
    container: {
        width: screen.width,
        height: 300,
        position: "absolute",
        bottom: 0,
        backgroundColor: "red"
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
});

export default styles
