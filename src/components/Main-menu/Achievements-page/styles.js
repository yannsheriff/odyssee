import { StyleSheet } from "react-native";
import screen from "../../../helpers/ScreenSize";

const styles = StyleSheet.create({
  container: {
    width: screen.width,
    height: screen.height,
    backgroundColor: "rgba(000, 000, 000, 0.9)",
    // opacity: 0.7,
    position: "absolute",
    top: 0,
    left: 0,
    flexDirection: "column",
    alignItems: "center"
  },
  title: {
    width: (screen.width / 100) * 60,
    marginTop: 120,
    fontFamily: "Infini-Regular",
    fontSize: 32,
    color: "white",
    textAlign: "center"
  },
  subtitle: {
    width: (screen.width / 100) * 60,
    marginTop: 20,
    fontSize: 16,
    color: "white",
    textAlign: "center"
  },
  animation: {
    marginTop: 20,
    width: (screen.width / 100) * 70,
    height: (screen.width / 100) * 70
  },
  touchable: {
    height: 60,
    width: 60,
    borderRadius: 50
  },
  collectablesContainer: {
    width: 70,
    marginRight: 15,
    flexDirection: "column",
    alignItems: "center"
  },
  glyphsFont: {
    color: "white",
    fontFamily: "Ravenia",
    fontSize: 18,
    position: "absolute",
    top: 22,
    width: 60,
    textAlign: "center",
    height: 40
  },
  glyphesName: {
    textAlign: "center",
    color: "white",
    width: 70,
    marginTop: 5
  },
  partConatiner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  partTitle: {
    marginLeft: 15,
    color: "white",
    fontFamily: "Infini-Regular",
    fontSize: 18
  },
  lineTitle: {
    height: 2,
    backgroundColor: "white",
    marginLeft: 10,
    flex: 1
  },
  header: { height: 70 }
});

export default styles;
