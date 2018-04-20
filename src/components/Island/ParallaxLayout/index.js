
//  Import modules
// --------------------------------------------------------------
import React, { Component } from 'react'
import {
  Animated,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
} from 'react-native'
import { connect } from 'react-redux'
import RNSimpleCompass from 'react-native-simple-compass'


//  Import Helpers
// --------------------------------------------------------------
import { backgrounds } from '../../../assets/images'
import screen from '../../../helpers/ScreenSize'
import styles from './styles'



export default class ParallaxLayout extends Component {

  constructor(props) {
    super(props)
    this.offsetX = 0
    this.state = {
      fadeAnim: new Animated.Value(0),
      source: props.source,
      imgWidth: this.calculateWidth(props.source)
    }
  }

  calculateWidth(img) {
    return ( screen.height * ( img.width / img.height ))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.offsetX && nextProps.offsetX != this.offsetX) {
      this.offsetX = nextProps.offsetX
      Animated.timing(
        this.state.fadeAnim,
      {
          toValue: nextProps.offsetX,
          duration: 5000,              
        }
      ).start()
    }
  }


  render() {

    return (
        <View style={ styles.container }>
          <Animated.Image 
            source={ this.state.source.image }
            resizeMode={'stretch'}
            resizeMethod={'resize'}
            style={[ styles.img, { left: this.state.fadeAnim, width: this.state.imgWidth }]}
          /> 
        </View>
    )
  }
}


