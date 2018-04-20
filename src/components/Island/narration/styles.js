import { StyleSheet } from 'react-native'
import screen from '../../../helpers/ScreenSize'


const styles = StyleSheet.create({
    container: {
        marginTop: 630,
        width: screen.width,
        height: 50,
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
