import { StyleSheet } from 'react-native'
import screen from '../../helpers/ScreenSize'


const styles = StyleSheet.create({
    container: {
        width: screen.width,
        height: screen.height,
        backgroundColor: '#fff'
    },
    background: {
        position: 'absolute',
        top: 0, 
        left: 0,
        width: screen.width,
        height: screen.height,
    },
    center: {
        position: 'absolute',
        top: screen.height/ 100 * 65, 
        left: 0,
        width: screen.width,
        flexDirection: "column",
        alignItems: "center"
    }, 
    buttonBorder: {
        paddingVertical: 5,
        width: 220,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 50,
        borderColor: "white",
        borderStyle: "solid"
    }

});

export default styles
