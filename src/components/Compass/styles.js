import { StyleSheet } from 'react-native'
import screen from '../../helpers/ScreenSize'


const styles = StyleSheet.create({
    compassResponder: {
        position: 'absolute',
        left: 0,
        top: 270
    },
    compass: {
        width: screen.width,
        resizeMode: 'contain',
    }
});

export default styles
