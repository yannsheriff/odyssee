
//  Import modules
// --------------------------------------------------------------
import React, { Component } from 'react'
import {
  Text,
  View,
  Button,
} from 'react-native'
import { connect } from 'react-redux'
import RNSimpleCompass from 'react-native-simple-compass'


//  Import Helpers
// --------------------------------------------------------------
import screen from '../../../helpers/ScreenSize'
import styles from './styles'


//  Import assets
// --------------------------------------------------------------
import { backgrounds } from '../../../assets/images'
import animations from '../../../assets/anim'

//  Import components
// --------------------------------------------------------------
import ParallaxLayout from '../ParallaxLayout'
import AnimationLayout from '../AnimationLayout'



export default class Illustrations extends Component {

  constructor(props) {
    super(props)
    this.state = {
      offsets: {
        first: props.offsets.first,
        middle: props.offsets.middle,
        back: props.offsets.back,
      },
      animation: {
        loop: props.animation.loop,
        animationId: props.animation.animationId,
        animationDuration: props.animation.animationDuration,
        transitionDuration: props.animation.transitionDuration,
      },
      image: props.source
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.offsets && nextProps.offsets !== this.state.offsets) {
      if(nextProps.animation && nextProps.animation !== this.state.animation) {
        this.setState({
          offsets: {
            first: nextProps.offsets.first,
            middle: nextProps.offsets.middle,
            back: nextProps.offsets.back,
          },
          animation: {
            loop: nextProps.animation.loop,
            animationId: nextProps.animation.animationId,
            animationDuration: nextProps.animation.animationDuration,
            transitionDuration: nextProps.animation.transitionDuration,
          },
        })
      }
    }
  }

  render() {
    return (
        <View style={ styles.container }>
          <ParallaxLayout 
            source={backgrounds.foret.p3}
            offsetX={this.state.offsets.back}
          />
          <ParallaxLayout 
            source={backgrounds.foret.p2}
            offsetX={this.state.offsets.middle}
          />
          <AnimationLayout
            nextAnimation={ animations[this.state.animation.animationId] }
            animationDuration={ this.state.animation.animationDuration } 
            transitionDuration={ this.state.animation.transitionDuration }
            loop={ this.state.animation.loop }
          />
          
          <ParallaxLayout 
            source={backgrounds.foret.p1}
            offsetX={this.state.offsets.first}
          />
        </View>
    )
  }
}


