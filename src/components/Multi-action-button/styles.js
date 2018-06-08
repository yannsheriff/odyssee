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
        paddingHorizontal: 10,
        textAlign: "center",
        fontFamily: "Infini-Regular",
        lineHeight: 90,
        fontSize: 70,
        color: "white",
        fontWeight: "bold",
    },
    animationContainer: {
        position: "absolute",
        height: 150,
        width: 150,
    },
    animation: {
        height: 150,
        width: 150,
    }
    
});

export default styles
