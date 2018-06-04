import React from "react";
import { Animated, Easing, View, Text, StyleSheet, Button,TouchableOpacity, Image } from "react-native";
import LottieView from "lottie-react-native";
import { connect } from "react-redux";
import { toggleMenu, saveMenu } from "../../redux/actions/menu";
import screen from "../../helpers/ScreenSize";
import Achivements from "./Achievements-page";
import { BlurView } from "react-native-blur";
import renderIf from "../../helpers/renderIf";

import Swiper from "react-native-swiper";
import images from "../../assets/images";

// import styles from './styles';\

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  }
});

class MainMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reduxStore: this.props.store,
      paginationPosition: new Animated.Value(0),
      _toggleMenu: this.props.toggleMenu,
      _saveMenu: this.props.saveMenu,
      display: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.store.menu.displayMenu !== this.state.display) {
      this.setState({
        reduxStore: nextProps.store,
        display: nextProps.store.menu.displayMenu,
        paginationPosition: new Animated.Value(0),
      });
    } else {
      this.setState({
        reduxStore: nextProps.store,
      })
    }
  }

  componentDidMount() {}

  indexDidChange = id => {
    Animated.timing(
      // Animate value over time
      this.state.paginationPosition, // The value to drive
      {
        toValue: id * (screen.width / 3),
        duration: 200 // Animate to final value of 1
      }
    ).start();
  };


  closeMenu = () => {
    this.state._saveMenu(this.state.reduxStore.menu)
    this.state._toggleMenu();
  };

  render() {
    return (
      <View style={{ position: "absolute", top: 0 }}>
        {renderIf(
          this.state.display,
          <View>
            <View
              style={[
                styles.absolute,
                { backgroundColor: "rgba(000, 000, 000, 0.1)" }
              ]}
            />
            <BlurView
              style={styles.absolute}
              viewRef={this.state.viewRef}
              blurType="light"
              blurAmount={20}
            />
            <Swiper
              style={styles.wrapper}
              loop={true}
              showsPagination={false}
              onIndexChanged={this.indexDidChange}
            >
              <View style={styles.slide1}>
                <Text style={styles.text}>Hello Swiper</Text>
              </View>
              <View style={{ backgroundColor: "transparent" }}>
                <Achivements  />
              </View>
              <View style={styles.slide3}>
                <Text style={styles.text}>And simple</Text>
              </View>
            </Swiper>
            <View
              style={{ position: "absolute", top: 70, right: 20, zIndex: 50 }}
            >
              <TouchableOpacity 
                onPress={this.closeMenu} 
                style={{width: 30, height: 30}}
              >
                <Image 
                  style={{width: 30, height: 30}}
                  source={images.closeMainMenu} 
                  />
              </TouchableOpacity>
            </View>
            <View
              style={{
                position: "absolute",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                bottom: 80,
                left: 0,
                width: screen.width,
                height: 4
              }}
            >
              <Animated.View
                style={{
                  position: "absolute",
                  backgroundColor: "#fff",
                  bottom: 0,
                  left: this.state.paginationPosition,
                  width: screen.width / 3,
                  height: 4
                }}
              />
            </View>
          </View>
        )}
      </View>
    );
  }
}

/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */

const mapStateToProps = state => {
  return {
    store: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleMenu: () => {
      dispatch(toggleMenu());
    },
    saveMenu: (state) => {
      dispatch(saveMenu(state));
    }
  };
};

toggleMenu;

const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainMenu);

export default componentContainer;
