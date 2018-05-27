
//  Import modules
// --------------------------------------------------------------
import React, { Component } from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  PanResponder,
} from 'react-native'
import SwipeRecognizer from 'react-native-swipe-recognizer';

//  Import actions
// --------------------------------------------------------------

//  Import Helpers
// --------------------------------------------------------------
import screen from '../../../helpers/ScreenSize'
import styles from './styles'



export default class Swip extends Component {

  constructor(props) {
    super(props)
    this.onSwipLeft = props.onSwipLeft
    this.onSwipRight = props.onSwipRight
    this.state = {
      style: props.style
    } 
  }

  componentWillMount() {
    const swipeRecognizer = new SwipeRecognizer();
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (e, gestureState) => {
        return swipeRecognizer.isHorizontalSwipe(gestureState);
      },
      onPanResponderRelease: (e, gestureState) => {
        if (swipeRecognizer.isRightSwipe(gestureState)) {
          this.onSwipRight()
        }
        if (swipeRecognizer.isLeftSwipe(gestureState)) {
          this.onSwipLeft()
        }
      },
    });
  }



  render() {
    return (
        <View style={this.state.style} { ...this._panResponder.panHandlers }>
        </View>
    );
  }
}
