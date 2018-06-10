import React, { Component } from "react";
import screen from "../../helpers/ScreenSize";
import images, { backgrounds } from "../../assets/images";
import { AsyncStorage, View, Text, Button, StyleSheet, Image } from "react-native";
import { storeService } from "../../helpers/saveData";
import LottieView from "lottie-react-native";
import MainMenu from "../Main-menu";
import { connect } from "react-redux";

import { toggleMenu } from "../../redux/actions/menu";

import { microInteraction } from "../../assets/anim";

import Swiper from 'react-native-swiper';

const styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
})


export default class Test extends Component {


  componentDidMount(){
    setTimeout(()=>{
      this.scroller.scrollBy(1, true)
    }, 1000)
  }
  render(){
    return (
      <View style={{height: screen.height, width: screen.width}}>
      <Swiper style={styles.wrapper} showsButtons={true}
        ref={scroller => this.scroller = scroller}
      >
        <View style={styles.slide1}>
          <Text style={styles.text}>Hello Swiper</Text>
        </View>
        <View style={styles.slide2}>
          <Text style={styles.text}>Beautiful</Text>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>And simple</Text>
        </View>
      </Swiper>
      </View>
    );
  }
}

