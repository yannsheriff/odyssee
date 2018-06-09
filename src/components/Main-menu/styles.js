import { StyleSheet } from "react-native";
import screen from "../../helpers/ScreenSize";

const styles = StyleSheet.create({
    wrapper: {},
    slide1: {
      backgroundColor: "transparent"
    },
    slide2: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#97CAE5"
    },
    slide3: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "transparent"
    },
    text: {
      color: "#fff",
      fontSize: 30,
      fontWeight: "bold"
    },
    absolute: {
      width: screen.width,
      height: screen.height,
      position: "absolute",
      top: 0,
      left: 0
    }, 
    categorieMenu: {
      flex: 1,
      fontFamily: "Infini-Regular",
      color: "white",
      fontSize: 18,
      textAlign: "center",
    }, 
    categories: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 15
    }, 
    close: { position: "absolute", top: 50, right: 40, zIndex: 50 },
    dash: { width: 1, height: 20, backgroundColor: 'rgba(255, 255, 255, 0.5)',  },
    navigationLine: {
      position: "absolute",
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      bottom: 80,
      left: 0,
      width: screen.width,
      height: 4
    },
    navigationIndicator: {
      position: "absolute",
      backgroundColor: "#fff",
      bottom: 0,
      width: screen.width / 3,
      height: 4
    },
    menuTextButton: {
      textAlign: "center",
      color: "white", 
      height: 55,
      fontSize: 22,
      fontFamily: "Infini-Regular"
    }
  });


export default styles;
