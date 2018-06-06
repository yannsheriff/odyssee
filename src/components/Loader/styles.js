import { StyleSheet } from "react-native";
import screen from "../../helpers/ScreenSize";

const styles = StyleSheet.create({
  anim: { width: 100, height: 100 },
  container: {
    position: "absolute",
    width: screen.width,
    height: screen.height,
    backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default styles;
