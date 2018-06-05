import React from "react";
import { Animated, Easing, View, Text, StyleSheet, Button,TouchableOpacity, Image } from "react-native";
import LottieView from "lottie-react-native";
import { connect } from "react-redux";
import { toggleMenu, saveMenu, navigateTo } from "../../redux/actions/menu";
import screen from "../../helpers/ScreenSize";
import Achivements from "./Achievements-page";
import { BlurView } from "react-native-blur";
import renderIf from "../../helpers/renderIf";
import ReactNativeHaptic from 'react-native-haptic'

import Swiper from "react-native-swiper";
import images from "../../assets/images";
import styles from './styles';


class MainMenu extends React.Component {
  constructor(props) {
    super(props);
    this.page = 0 
    this.state = {
      reduxStore: this.props.store,
      paginationPosition: new Animated.Value(0),
      display: false,
      popupDisplay: true,
      _toggleMenu: this.props.toggleMenu,
      _saveMenu: this.props.saveMenu,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.store.menu.displayMenu !== this.state.display) {
      if(nextProps.store.menu.page) {
        this.page = nextProps.store.menu.page,
        this.setState({
          reduxStore: nextProps.store,
          display: nextProps.store.menu.displayMenu,
          paginationPosition: new Animated.Value(nextProps.store.menu.page * (screen.width / 3)),
        });
      } else {
        this.setState({
          reduxStore: nextProps.store,
          display: nextProps.store.menu.displayMenu,
          paginationPosition: new Animated.Value(0),
        });
      }
      
    } else {
      this.setState({
        reduxStore: nextProps.store,
      })
    }
  }



  indexDidChange = id => {
    Animated.timing(
      this.state.paginationPosition, 
      {
        toValue: id * (screen.width / 3),
        duration: 200 
      }
    ).start();
    this.page = id
  };

  quitIsland() {

  }


  closeMenu = () => {
    ReactNativeHaptic.generate('impact')
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
                { backgroundColor: "rgba(000, 000, 000, 0.3)" }
              ]}
            />
            <BlurView
              style={styles.absolute}
              viewRef={this.state.viewRef}
              blurType="light"
              blurAmount={20}
            />
            {renderIf( !this.state.popupDisplay, 
            <View>
              <View
                style={styles.close}
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
              <Swiper
                style={styles.wrapper}
                showsPagination={false}
                onIndexChanged={this.indexDidChange}
                index={this.page}
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
                style={styles.navigationLine}
              >
                <Animated.View
                  style={[styles.navigationIndicator, {left: this.state.paginationPosition,}]}
                />
                <View style={styles.categories}> 
                  <Text style={[styles.categorieMenu, { opacity: this.state.page === 0 ? 1 : 0.7 }]}>Carte</Text>
                  <View style={[styles.dash, {marginLeft: -10}]} />
                  <Text style={[styles.categorieMenu, { opacity: this.state.page === 1 ? 1 : 0.7 }]}>Inventaire</Text>
                  <View style={[styles.dash, {marginRight: -9}]}/>
                  <Text style={[styles.categorieMenu, { opacity: this.state.page === 2 ? 1 : 0.7 }]}>Reglages</Text>
                </View>
              </View> 
            </View>)}

            {renderIf( this.state.popupDisplay, 
              <View style={{width: screen.width, marginTop: screen.height / 100 * 40, flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Text style={{textAlign: "center", color: "white", fontSize: 22, fontFamily: "Infini-Regular",width: screen.width /100 * 90 }} > Etes-vous sur de vouloir quitter l'ile ? </Text>
                <View style={{marginTop: 30, flexDirection: "row", justifyContent: "space-around", width: screen.width / 100 * 60 }}>
                  <TouchableOpacity
                    onPress={() => { this.state._navigateTo('Sailing') }}
                  >
                   <Text style={{textAlign: "center", color: "white", fontSize: 22, fontFamily: "Infini-Regular"}} > Oui </Text>
                   </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => { this.setState({ popupDisplay: false })}}
                  >
                    <Text style={{textAlign: "center", color: "white", fontSize: 22, fontFamily: "Infini-Regular"}} > Non </Text>
                  </TouchableOpacity>
                </View>
              </View>

            )}
            
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
    },
    navigateTo: (screen) => {
      dispatch(navigateTo(screen))
    }
  };
};

toggleMenu;

const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainMenu);

export default componentContainer;
