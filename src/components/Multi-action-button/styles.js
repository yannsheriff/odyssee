import { StyleSheet } from 'react-native'
import screen from '../../helpers/ScreenSize'


const styles = StyleSheet.create({


    absolute: {
        width: screen.width,
        height: screen.height,
        position: "absolute",
        top: 0, 
        left: 0
    },
    background: {
        backgroundColor: '#000',
        height: screen.height,
        width: screen.width
    },
    center: {
        marginTop: 400
    }, 
    choiceImg: {
        position: "absolute",
        resizeMode: 'contain',
    },
    text: {
        position:"absolute",
        top: 300,
        width: screen.width,
        textAlign: "center",
        fontSize: 70,
        color: "white",
        fontWeight: "bold",
    },
    animation: {
        position: "absolute",
        top: 233.5,
        left: -5.5,
        height: 400,
        width: 400,
        // backgroundColor: 'black'
    }
    
});

export default styles
