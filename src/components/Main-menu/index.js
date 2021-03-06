import React from "react";
import { Animated, View, Text,TouchableOpacity, Image } from "react-native";

import { connect } from "react-redux";
import { toggleMenu, saveMenu } from "../../redux/actions/menu";
import { collision } from '../../redux/actions/sailing'
import { NavigationActions } from "react-navigation";
import { navigateTo } from "../../redux/actions/navigation";
import screen from "../../helpers/ScreenSize";
import Achivements from "./Achievements-page";
import { BlurView } from "react-native-blur";
import renderIf from "../../helpers/renderIf";
import ReactNativeHaptic from 'react-native-haptic'
import MiniMap from '../../components/Miniature-map'
import Swiper from "react-native-swiper";
import images from "../../assets/images";
import styles from './styles';


class MainMenu extends React.Component {
  constructor(props) {
    super(props);

    this.once = 0
    this.state = {
      page: 0,
      reduxStore: this.props.store,
      nav: this.props.navigation,
      paginationPosition: new Animated.Value(0),
      display: false,
      popupDisplay: false,
      _toggleMenu: this.props.toggleMenu,
      _saveMenu: this.props.saveMenu,
      _navigateTo: this.props.navigateTo,
      _reverseCollisionOnNavigation: this.props.reverseCollisionOnNavigation,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.store.menu.displayMenu !== this.state.display) {
        this.setState({
          page: nextProps.store.menu.page,
          reduxStore: nextProps.store,
          display: nextProps.store.menu.displayMenu,
          paginationPosition: new Animated.Value(this.state.page  * (screen.width / 3)),
          popupDisplay: false
        });
        if (nextProps.store.menu.displayMenu && this.state.page !== nextProps.store.menu.displayMenu ) {
          this.once += 1
          if (this.once < 2) {
            setTimeout(()=>{
              this.scroller.scrollBy(this.state.page, true)
            }, 500)
            setTimeout(()=>{
              this.once = 0
            }, 3500)
          } 
        }
    } else {
      this.setState({
        reduxStore: nextProps.store,
      })
    }
  }

  indexDidChange = id => {
    this.setState({page: id})
    Animated.timing(
      this.state.paginationPosition, 
      {
        toValue: id * (screen.width / 3),
        duration: 200 
      }
    ).start();
  };

  displayQuitPopup = () => {
    this.setState({
      popupDisplay: true
    })
  }

  navigateToTest = (id) => {
    this.state._toggleMenu();
    this.state._navigateTo('Test')
  };

  scrollTo = id => {
    var relativeIndex = id - this.state.page
    this.scroller.scrollBy(relativeIndex, true)
  }

  quit = () => {
    this.closeMenu()
    if(this.state.reduxStore.isOnIsland) {
      this.state._reverseCollisionOnNavigation()
      this.state._navigateTo("Sailing")
    } else {
      this.state._navigateTo("Home")
    }

  };

  closeMenu = () => {
    ReactNativeHaptic.generate('impact')
    this.state._saveMenu(this.state.reduxStore.menu)
    this.state._toggleMenu();
  };

  render() {

    var popUpText = this.state.reduxStore.isOnIsland ? "Etes-vous sur de vouloir quitter l'ile ?" : "Etes-vous sur de vouloir retourner au menu ?"
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
              blurAmount={13}
            />
            {renderIf( !this.state.popupDisplay, 
            <View>
              <View
                style={styles.close}
              >
                <TouchableOpacity 
                  onPress={this.closeMenu} 
                  style={{width: 35, height: 35}}
                >
                  <Image 
                    style={{width: 35, height: 35}}
                    source={images.closeMainMenu} 
                    />
                </TouchableOpacity>
              </View>
              <Swiper
                style={styles.wrapper}
                showsPagination={false}
                onIndexChanged={this.indexDidChange}
                ref={scroller => this.scroller = scroller}
              >
                <View style={styles.slide1}>
                  <MiniMap />
                </View>
                <View style={{ backgroundColor: "transparent" }}>
                  <Achivements  />
                </View>
                <View style={styles.slide3}>
                <TouchableOpacity onPress={this.navigateToTest}>
                  <Text style={styles.menuTextButton}> Aide </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={this.displayQuitPopup}
                  >
                    <Text style={styles.menuTextButton}> Quitter </Text>
                  </TouchableOpacity>
                
                </View>
              </Swiper>
              <View
                style={styles.navigationLine}
              >
                <Animated.View
                  style={[styles.navigationIndicator, {left: this.state.paginationPosition}]}
                />
                <View style={styles.categories}> 
                  <TouchableOpacity 
                    onPress={()=> this.scrollTo(0)}
                    style={styles.categorieMenu}>
                    <Text style={[styles.categorieMenuText, { opacity: this.state.page === 0 ? 1 : 0.5 }]}>Carte</Text>
                  </TouchableOpacity> 
                  <View style={[styles.dash, {marginLeft: -10}]} />
                  <TouchableOpacity 
                    onPress={()=> this.scrollTo(1)}
                    style={styles.categorieMenu}>
                    <Text style={[styles.categorieMenuText, { opacity: this.state.page === 1 ? 1 : 0.5 }]}>Inventaire</Text>
                  </TouchableOpacity>
                  <View style={[styles.dash, {marginRight: -9}]}/>
                  <TouchableOpacity 
                    onPress={()=> this.scrollTo(2)}
                    style={styles.categorieMenu}>
                    <Text style={[styles.categorieMenuText, { opacity: this.state.page === 2 ? 1 : 0.5 }]}>Reglages</Text>
                  </TouchableOpacity>
                </View>
              </View> 
            </View>)}

            {renderIf( this.state.popupDisplay, 
              <View style={{width: screen.width, marginTop: screen.height / 100 * 40, flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Text style={{textAlign: "center", color: "white", fontSize: 22, fontFamily: "Infini-Regular",width: screen.width /100 * 90 }} >{popUpText}  </Text>
                <View style={{marginTop: 30, flexDirection: "row", justifyContent: "space-around", width: screen.width / 100 * 60 }}>
                  <TouchableOpacity
                    onPress={this.quit}
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
    },
    navigateTo: (routeName)=> {
      dispatch(navigateTo(routeName))
    }, 
    reverseCollisionOnNavigation: () => {
      dispatch(collision(null))
    }
  };
};

toggleMenu;

const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainMenu);

export default componentContainer;
