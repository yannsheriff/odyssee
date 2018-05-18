
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
  Animated
} from 'react-native'
import { connect } from 'react-redux'
import RNSimpleCompass from 'react-native-simple-compass';

//  Import actions
// --------------------------------------------------------------

//  Import Helpers
// --------------------------------------------------------------
import images from '../../../assets/images'
import screen from '../../../helpers/ScreenSize'
import styles from './styles'



export default class Narration extends Component {

  constructor(props) {
    super(props);
    this.animation = []
    this.state = {
      isTransitionFinished: true,
      transitionDuration: this.props.transitionDuration ? this.props.transitionDuration : 1000,
      texts: [
        {
          // If animation is not null put it in the state
          text: props.snippet.text ? props.snippet.text : null,
          position: new Animated.Value(0),
        }
      ],
    }
  }


  componentWillReceiveProps (nextProps) {
    if(nextProps.snippet.text && this.state.isTransitionFinished ) { // If component receive a new animation 
      
      // Get transition duration
      let transitionDuration = nextProps.transitionDuration ? nextProps.transitionDuration : this.state.transitionDuration
      
      // Push new animation in state array
      this.setState({ 
        isTransitionFinished: false,
        texts:[ 
          {
            text: nextProps.snippet.text, 
            position: new Animated.Value(screen.width-2)
          }, 
          ...this.state.texts
        ]
      }, function () { // When set state did finish


        // Animate the old & the animation to the left
        Animated.parallel([
          Animated.timing(this.state.texts[1].position, {
            duration: transitionDuration ,
            toValue: -screen.width + 2, 
          }),
          Animated.timing(this.state.texts[0].position, {
            duration: transitionDuration,
            toValue: 0,
          }),
        ]).start(()=> {
          // When the animation is finished wiat 1s and delete old animation from the state Array
          setTimeout(()=> {
            this.setState({ 
              texts: [this.state.texts.shift()],
              isTransitionFinished: true
            })
          }, 500)
        }); 
      })
    }
  }


  render() {

    var text = this.state.texts.map((text, index) => {
      if (text) {   // If animation exist then render it
        return (
          <Animated.View style={{ position: "absolute", left: text.position, top: 580, width: screen.width, flexDirection: "row", justifyContent: "center" }}>
            <Text style={ styles.text }> { text.text } </Text>
          </Animated.View>
        )
      } else {      // Else render a blank layer
        return <Animated.View style={[{ left: text.position }]}> </Animated.View>
      }
    })

    return (
      <View>
        { text }
      </View>
  );
   
  }
}
