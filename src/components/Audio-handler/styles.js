import { StyleSheet } from 'react-native'
import screen from '../../helpers/ScreenSize'


const styles = StyleSheet.create({
    container: {
        width: screen.width,
        height: screen.height,
        // opacity: 0.7,
        position: "absolute",
        top: 0,
        left: 0,
        flexDirection: "column",
        alignItems: "center",
    },  
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      },

    text: {
        position: 'absolute',
        bottom: 40,
        width: screen.width,
        textAlign: 'center',
        fontSize: 16,
        color: "white",
        fontFamily: 'OpenSans-SemiBold'
    }
    
});

export default styles
