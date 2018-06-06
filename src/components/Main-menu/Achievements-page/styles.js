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
  achievementContainer: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    flex: 1,
    height: 50
  },
  achievementText: {
    color: "white",
    fontSize: 18,
    width: screen.width / 100 * 80
  },
  achievementImage: {
    width: 30,
    height: 30,
  },
  scrollview: {
    height: screen.height /100 * 53.5
  },
  partContainer: {
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
