import { StyleSheet } from "react-native";
import screen from "../../../helpers/ScreenSize";

const styles = StyleSheet.create({
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
});

export default styles;
