import React from 'react';
import { Animated, Easing, View } from 'react-native';
import LottieView from 'lottie-react-native';


import styles from './styles';
import screen from '../../../helpers/ScreenSize'

export default class BasicExample extends React.Component {
  constructor(props) {
    super(props);
    this.animation = []
    this.state = {
      isTransitionFinished: true,
      animations: [
        {
          animation: props.nextAnimation,
          animationProgress: new Animated.Value(0),
          position: new Animated.Value(0),
        }
      ],
    };
    this.singleAnimation(this.state.animations[0].animationProgress, props.animationDuration)
  }


  componentWillReceiveProps (nextProps) {
    if(nextProps.nextAnimation && this.state.isTransitionFinished ) { // If component receive a new animation 
      
      // Push new animation in state array
      this.setState({ 
        isTransitionFinished: false,
        animations:[ 
          {
            animation: nextProps.nextAnimation, 
            animationProgress: new Animated.Value(0),
            position: new Animated.Value(screen.width-2)
          }, 
          ...this.state.animations
        ]
      }, function () { // When set state did finish

        // launch new animation
        this.launchNewAnimationOnReceive(1000, nextProps.loop) 

        // Animate the old & the animation to the left
        Animated.parallel([
          Animated.timing(this.state.animations[1].position, {
            duration: nextProps.transitionDuration,
            toValue: -screen.width + 2, 
          }),
          Animated.timing(this.state.animations[0].position, {
            duration: nextProps.transitionDuration,
            toValue: 0,
          }),
        ]).start(()=> {
          // When the animation is finished wiat 1s and delete old animation from the state Array
          setTimeout(()=> {
            this.setState({ 
              animations: [this.state.animations.shift()],
              isTransitionFinished: true
            })
          }, 1000)
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
        toValue: 0.7,
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
      toValue: 0.7,
      duration: duration,
    }).start()
  }





  render() {
      var animations = this.state.animations.map((anim, index) => {
        return (
          <Animated.View style={[styles.background, { left: anim.position }]}>
           <LottieView 
                source={ anim.animation } 
                progress={ anim.animationProgress }
            />
          </Animated.View>
        );
      })

      return (
        <View>
          { animations }
        </View>
    );
  }
}