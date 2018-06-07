import React from 'react';
import { Animated, Easing, View } from 'react-native';
import LottieView from 'lottie-react-native';


import styles from './styles';
import screen from '../../../helpers/ScreenSize'

export default class AnimationLayout extends React.Component {
  constructor(props) {
    super(props);
    this.animation = []
    this.state = {
      lastProps: this.props.nextAnimation,
      isTransitionFinished: true,
      animations: [
        {
          // If animation is not null put it in the state
          animation: props.nextAnimation ? props.nextAnimation.animation : null,
          animationProgress: new Animated.Value(0),
          position: new Animated.Value(0),
        }
      ],
    }
    
    // If animation is not null launch it in the constructor
    if (props.nextAnimation) {
      if (props.loop) {
        this.cycleAnimation(this.state.animations[0].animationProgress, props.animationDuration)
      } else {
        this.singleAnimation(this.state.animations[0].animationProgress, props.animationDuration)
      }
    }
  }


  componentWillReceiveProps (nextProps) {
    if( this.state.isTransitionFinished && nextProps.nextAnimation !== this.state.lastProps ) { // If component receive a new animation 
      
      // Push new animation in state array
      this.setState({ 
        isTransitionFinished: false,
        lastProps: nextProps.nextAnimation,
        animations:[ 
          {
            animation: nextProps.nextAnimation ? nextProps.nextAnimation.animation : null, 
            animationProgress: new Animated.Value(0),
            position: nextProps.swipBack ? new Animated.Value(-screen.width-2) : new Animated.Value(screen.width-2)
          }, 
          ...this.state.animations
        ]
      }, function () { // When set state did finish

        // launch new animation if it exist
        if (nextProps.nextAnimation) {
          this.launchNewAnimationOnReceive(nextProps.animationDuration, nextProps.loop) 
        }

        // Animate the old & the animation to the left
        Animated.parallel([
          Animated.timing(this.state.animations[1].position, {
            duration: 1500,
            toValue:  nextProps.swipBack ? screen.width + 2 : -screen.width + 2 , 
          }),
          Animated.timing(this.state.animations[0].position, {
            duration: 1500,
            toValue:  0,
          }),
        ]).start(()=> {
          
          // When the animation is finished wiat 1s and delete old animation from the state Array
          this.setState({ 
            animations: [this.state.animations.shift()],
            isTransitionFinished: true
          })
        }); 
      })
    }
  }

  /* 
  * Launch the animation on receive
  */
  launchNewAnimationOnReceive(duration, isLoop) {
    if (isLoop) {
      this.cycleAnimation( this.state.animations[0].animationProgress, duration)
    } else {
      this.singleAnimation(this.state.animations[0].animationProgress, duration)
    }
  }
  
  /* 
  * Plays the animation in loop 
  */
  cycleAnimation(value, duration) {
    Animated.sequence([
      Animated.timing(value, {
        toValue: 1,
        duration: duration,
      }),
      Animated.timing(value, {
        toValue: 0,
        duration: 1
      })
    ]).start(() => {
      if(value) {
        this.cycleAnimation(value, duration);
      }
    });
  }

  singleAnimation(value, duration) {
    Animated.timing(value, {
      toValue: 1,
      duration: duration,
    }).start()
  }


  render() {
      var animations = this.state.animations.map((anim, index) => {
        if (anim) {   // If animation exist then render it
          return (
            <Animated.View style={[styles.background, { left: anim.position }]}>
             <LottieView 
                  source={ anim.animation } 
                  progress={ anim.animationProgress }
              />
            </Animated.View>
          )
        } else {      // Else render a blank layer
          return <Animated.View style={[styles.background, { left: anim.position }]}> </Animated.View>
        }
      })

      return (
        <View>
          { animations }
        </View>
    );
  }
}