import { StyleSheet } from "react-native";
import screen from "../../helpers/ScreenSize";

const styles = StyleSheet.create({
  anim: { width: screen.width, height: screen.height },
  container: {
    position: "absolute",
    width: screen.width,
    height: screen.height,
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default styles;
