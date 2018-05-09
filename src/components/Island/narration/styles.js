import { StyleSheet } from 'react-native'
import screen from '../../../helpers/ScreenSize'


const styles = StyleSheet.create({
    container: {
        marginTop: 630,
        width: screen.width,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        textAlign: 'center',
        width: screen.width - 40,
    },
});

export default styles
