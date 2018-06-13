import React, { Component } from "react";
import screen from "../../helpers/ScreenSize";
import { tuto } from "../../assets/images";
import { connect } from 'react-redux'
import {  View, Text, StyleSheet, Image, Animated, Easing, TouchableOpacity } from "react-native";
import { navigateTo } from '../../redux/actions/navigation'

import Swiper from 'react-native-swiper';

const styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 26,
    fontFamily: 'OpenSans-SemiBold',
    textAlign: 'center',
    color: '#000000',
    marginBottom: 25,
    marginTop: 60,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Infini', 
    paddingHorizontal: 20,
    color: 'rgba(0,0,0,0.3)',
  }
})


class Test extends Component {

  constructor(props) {
    super(props);
    this.screens = []
    this.colors= []
    this.actualId = 0
    this.state = {
      bg: new Animated.Value(0),
      displayedScreens: [{ source: tuto[0], positionTop: new Animated.Value(50), positionLeft: new Animated.Value(0) }],
      _navigateTo: this.props.navigateTo
    };
  }
  

  changeScreen(id, swipBack) {

    this.setState({ 
      isTransitionFinished: false,
      displayedScreens: [ 
        {
          source: tuto[id],
          positionTop: swipBack ? new Animated.Value(50) : new Animated.Value(screen.height),
          positionLeft:  swipBack ? new Animated.Value(-screen.width) : new Animated.Value(0),
        }, 
        ...this.state.displayedScreens
      ]
    }, function () {

    if(swipBack) {
      Animated.parallel([
        Animated.timing(this.state.bg, {
          duration: 1000,
          toValue:  id, 
        }),
        Animated.timing(this.state.displayedScreens[1].positionTop, {
          easing: Easing.out(Easing.ease),
          duration: 1000,
          toValue:  screen.height, 
        }),
        Animated.timing(this.state.displayedScreens[0].positionLeft, {
          delay: 500,
          easing: Easing.inOut(Easing.ease),
          duration: 1000,
          toValue:  0,
        })
      ]).start(()=> {
  
        this.setState({ 
          actualId: id,
          displayedScreens: [this.state.displayedScreens.shift()],
          isTransitionFinished: true
        })
      }); 
    } else {
      Animated.parallel([
        Animated.timing(this.state.bg, {
          duration: 1000,
          toValue:  id, 
        }),
        Animated.timing(this.state.displayedScreens[1].positionLeft, {
          easing: Easing.out(Easing.ease),
          duration: 750,
          toValue:  -screen.width, 
        }),
        Animated.timing(this.state.displayedScreens[0].positionTop, {
          delay: 200,
          easing: Easing.inOut(Easing.ease),
          duration: 1000,
          toValue:  50,
        })
      ]).start(()=> {
  
        this.setState({ 
          actualId: id,
          displayedScreens: [this.state.displayedScreens.shift()],
          isTransitionFinished: true
        })
      }); 
    }

    
  })
  }
  
  didSwip = (id) => {
    console.log(id)
    let direction = id < this.state.actualId ? true : false
    this.changeScreen(id, direction)
  }

  skip = () => {
    console.log('ntm')
    this.state._navigateTo('Sailing')
  }

  render(){

    var screens = this.state.displayedScreens.map((screens) => {
        return (
          <Animated.View style={{ width: screen.width, height: screen.height / 100 * 60, position: 'absolute',  top: screens.positionTop, left: screens.positionLeft}}>
           <Image 
            style ={{ height: screen.height / 100 * 65, width: screen.width }}
            resizeMode={'contain'}
            source={ screens.source }
           />
          </Animated.View>
        )
    })

    
    var pointColor = this.state.bg.interpolate({
      inputRange: [0, 1, 2, 3],
      outputRange: [ 'rgb(48,117,231)', 'rgb(63,98,79)', 'rgb(240,147,220)', 'rgb(126,89,208)'] 
    })
    var bgColor = this.state.bg.interpolate({
      inputRange: [0, 1, 2, 3],
      outputRange: ['rgba(186, 219, 252, 1.0)', 'rgba(206, 226, 209, 1.0)', 'rgba(255, 212, 244, 1.0)', 'rgba(232, 221, 250, 1.0)'] 
    })

    return (
      <View>
      <Animated.View style={{ height: screen.height, width: screen.width, backgroundColor: bgColor }}>
      { screens }
      <TouchableOpacity style={{ position: "absolute", top: 50, right: 25 }} onPress={ this.skip }><Text style={{ color: "white" }}> Skip </Text></TouchableOpacity>
        <View style={{height: screen.height / 100 * 40 , width: screen.width, position: "absolute", bottom: 0, backgroundColor: '#fff'}}>

        <Swiper style={styles.wrapper} 
          onIndexChanged={this.didSwip}
          loop={false}
          autoplay={false}
          dot={
            <View style={{backgroundColor:'rgba(0,0,0,.2)', width: 8, height: 8,borderRadius: 4, marginLeft: 15, marginRight: 15, marginTop: 3, marginBottom: 3,}} />
          }

          activeDot={
            <Animated.View style={{backgroundColor:bgColor , width: 32, height: 32, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: 5, marginRight: 5, marginTop: 3, marginBottom: 3,}}>
              <Animated.View style={{backgroundColor: pointColor, width: 6, height: 6, borderRadius: 3 }}/>
            </Animated.View>
          }
        >
          <View style={styles.slide}>
            <Text style={styles.title}>Naviguation</Text>
            <Text style={styles.text}>Utiliser la boussole de votre smartphone en le déplacant pour contrôler le navire ou déplacer manuellement la boussole en activant l’option.</Text>
          </View>
          <View style={styles.slide}>
            <Text style={styles.title}>Carte</Text>
            <Text style={styles.text}>Sélectionner un point sur la carte pour donner un cap au navire et repérez vous grace aux glyths en surbrillance présent au dessus de la boussole.</Text>
          </View>
          <View style={styles.slide}>
            <Text style={styles.title}>Pouvoirs</Text>
            <Text style={styles.text}>Pour activer les pouvoirs des dieux utiliser le force touch sur le bateau et sélectionner votre pouvoir influencant la naviguation.</Text>
          </View>
          <View style={styles.slide}>
            <Text style={styles.title}>Choix</Text>
            <Text style={styles.text}>Sur les îles effectuer une pression continue sur le bouton d’action puis sélectionner votre choix pour influencer le récit.</Text>
          </View>
        </Swiper>
        </View>
        </Animated.View>
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
      navigateTo: (routeName)=> {
        dispatch(navigateTo(routeName))
      }
    };
  };
  
  const componentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Test);
  
  export default componentContainer;
  