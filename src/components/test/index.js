import React from "react";
import screen from "../../helpers/ScreenSize";
import images, { backgrounds } from "../../assets/images";
import { AsyncStorage, View, Button, StyleSheet, Image } from "react-native";
import { storeService } from "../../helpers/saveData";
import LottieView from "lottie-react-native";
import MainMenu from "../Main-menu";
import { connect } from "react-redux";

import { toggleMenu } from "../../redux/actions/menu";

import { microInteraction } from "../../assets/anim";

const styles = StyleSheet.create({
  container: {
    width: screen.width,
    height: screen.height
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    width: screen.width,
    height: screen.height
  },
  center: {
    position: "absolute",
    top: 550,
    left: 0,
    width: screen.width,
    flexDirection: "column",
    alignItems: "center"
  },
  buttonBorder: {
    paddingVertical: 5,
    width: 220,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "white",
    borderStyle: "solid"
  }
});

class BasicExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      _toggleMenu: this.props.toggleMenu
    };
  }

  componentDidMount() {
    // this.restoreData()
    // this.consoleDataSaved()
    // this.getPreviousSnipet()
    // this.handleIslandData()
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.background}
          source={images.homeScreen}
          resizeMethod="scale"
        />
        <View style={{ position: "absolute", top: 70, left: 20, zIndex: 50 }}>
          <Button
            title={"menu"}
            onPress={() => {
              this.state._toggleMenu();
            }}
          />
        </View>
      </View>
    );
  }
}

/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    toggleMenu: () => {
      dispatch(toggleMenu());
    }
  };
};

const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BasicExample);

export default componentContainer;
