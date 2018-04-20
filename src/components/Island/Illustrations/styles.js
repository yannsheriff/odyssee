import { StyleSheet } from 'react-native'
import screen from '../../../helpers/ScreenSize'


const styles = StyleSheet.create({
    container: {
        width: screen.width,
        height: screen.height,
        position: 'absolute',
        top: 0,
    },
    img: {
        height: screen.height,
        resizeMode: 'stretch',
    }
});

export default styles
