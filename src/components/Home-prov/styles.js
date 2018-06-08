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
        top: screen.height/ 100 * 70, 
        left: 0,
        width: screen.width,
        flexDirection: "column",
        alignItems: "center"
    }, 
    buttonBorder: {
        paddingVertical: 14,
        width: 260,
        marginBottom: 30,
        borderWidth: 1,
        borderRadius: 50,
        borderColor: "#e3e7eb",
        borderStyle: "solid"
    },
    buttonPlain: {
        paddingVertical: 14,
        width: 260,
        marginBottom: 10,
        borderRadius: 50,
        backgroundColor: "#9c75d7",
        borderStyle: "solid"
    },
    buttonText: {
        width: 260,
        textAlign: "center",
        fontSize: 14
    }
    

});

export default styles
