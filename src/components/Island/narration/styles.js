import { StyleSheet } from 'react-native'
import screen from '../../../helpers/ScreenSize'


const styles = StyleSheet.create({
    container: {
        marginTop: screen.height / 100 * 75,
        width: screen.width,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    text: {
        fontFamily: "Infini-Regular",
        fontSize: 15,
        lineHeight: 26,
        color: 'white',
        textAlign: 'left',
        width: screen.width - 40,
    },
});

export default styles
