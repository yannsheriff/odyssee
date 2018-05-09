import React from 'react';
import { Animated, Easing, View, Button, TouchableWithoutFeedback, Image, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import anim from '../../assets/anim/etoiles/data.json'
import perso from '../../assets/anim/perso/perso.json'
import styles from './styles';
import { BlurView } from 'react-native-blur';
import images from '../../assets/images'
import AnimationLayout from '../Island/AnimationLayout'
import screen from '../../helpers/ScreenSize'

export default class BasicExample extends React.Component {
  constructor(props) {
    super(props);
    this.firstTouch = undefined
    this.menuIsOpen = false
    this.initialPosition = {
      x: screen.width/2 -30,
      y: screen.height - 100
    }

    this.state = {
      opacity: 0,
      optionsSize: new Animated.Value(0),
      text: '',
      first: {
        x: new Animated.Value(this.initialPosition.x),
        y: new Animated.Value(this.initialPosition.y),
        x1: this.initialPosition.x - 90,
        y1: this.initialPosition.y -80,
      },
      second: {
        x: new Animated.Value(this.initialPosition.x),
        y: new Animated.Value(this.initialPosition.y),
        x1: this.initialPosition.x + 0,
        y1: this.initialPosition.y - 110,
      },
      third: {
        x: new Animated.Value(this.initialPosition.x),
        y: new Animated.Value(this.initialPosition.y),
        x1: this.initialPosition.x + 90,
        y1: this.initialPosition.y - 80,
      },
    };
  }


  next = () => {
    var rand = Math.floor(Math.random() * 2) 
    console.log(rand)
    this.setState({
      next: rand
    })
  }

  _openMenu = () => {
    this.setState({
      opacity: 1
    })

    Animated.parallel([

      Animated.spring(this.state.first.x, {
        toValue: this.initialPosition.x - 90, 
        duration: 1000,
      }),
      Animated.spring(this.state.first.y, {
        toValue: this.initialPosition.y - 80, 
        duration: 1000,
      }),
      Animated.spring(this.state.second.x, {
        toValue: this.initialPosition.x, 
        duration: 1000,
      }),
      Animated.spring(this.state.second.y, {
        toValue: this.initialPosition.y - 110, 
        duration: 1000,
      }),
      Animated.spring(this.state.third.x, {
        toValue: this.initialPosition.x + 90, 
        duration: 1000,
      }),
      Animated.spring(this.state.third.y, {
        toValue: this.initialPosition.y - 80, 
        duration: 1000,
      }),

      Animated.spring(this.state.optionsSize, {
        duration: 1000,
        toValue: 60, 
      })
    ]).start();
  }

  _closeMenu = () => {
    this.firstTouch = undefined;  
    this.menuIsOpen = false;
    this.setState({
      opacity: 0
    })

    Animated.parallel([

      Animated.spring(this.state.first.x, {
        toValue: this.initialPosition.x, 
        duration: 1000,
      }),
      Animated.spring(this.state.first.y, {
        toValue: this.initialPosition.y, 
        duration: 1000,
      }),
      Animated.spring(this.state.second.x, {
        toValue: this.initialPosition.x, 
        duration: 1000,
      }),
      Animated.spring(this.state.second.y, {
        toValue: this.initialPosition.y, 
        duration: 1000,
      }),
      Animated.spring(this.state.third.x, {
        toValue: this.initialPosition.x, 
        duration: 1000,
      }),
      Animated.spring(this.state.third.y, {
        toValue: this.initialPosition.y, 
        duration: 1000,
      }),

      Animated.spring(this.state.optionsSize, {
        duration: 1000,
        toValue: 0, 
      })
    ]).start();
  }

  

  

  _handleDrag = (evt) => {
      if (this.firstTouch) {
        if ( evt.nativeEvent.timestamp > this.firstTouch + 900) {
          if (!this.menuIsOpen) {
            this._openMenu()
            this.menuIsOpen = true
          }
          if ( evt.nativeEvent.pageX > this.state.first.x1 
            && evt.nativeEvent.pageX < this.state.first.x1 + 60
            && evt.nativeEvent.pageY > this.state.first.y1
            && evt.nativeEvent.pageY < this.state.first.y1 + 60 ) {
              this.setState({text: "Prendre la lance "})
          }
          else if ( evt.nativeEvent.pageX > this.state.second.x1 
            && evt.nativeEvent.pageX < this.state.second.x1 + 60
            && evt.nativeEvent.pageY > this.state.second.y1
            && evt.nativeEvent.pageY < this.state.second.y1 + 60 ) {
              this.setState({text: "Prendre l'arc"})
          }
          else if ( evt.nativeEvent.pageX > this.state.third.x1 
            && evt.nativeEvent.pageX < this.state.third.x1 + 60
            && evt.nativeEvent.pageY > this.state.third.y1
            && evt.nativeEvent.pageY < this.state.third.y1 + 60 ) {
            this.setState({text: "Continuer"})
          }
          else {
            this.setState({text: ""})
          }
          // console.log(evt.nativeEvent.pageX)
        }
        
      } else {
        this.firstTouch = evt.nativeEvent.timestamp
      }
  
    
  }

  render() {
    return (
        <View style={{
          width: screen.width,
          height: screen.height,
          justifyContent: "center",
          backgroundColor: '#fff',
        }}>
            <Image
              style={styles.absolute}
              source={images.home}
            />
            <BlurView
                style={[styles.absolute, {opacity: this.state.opacity}]}
                viewRef={this.state.viewRef}
                blurType="light"
                blurAmount={10}
              />
              <Text
              style={{
                position:"absolute",
                top: 300,
                width: screen.width,
                textAlign: "center",
                fontSize: 80,
                fontWeight: "bold",
              }}
              >  {this.state.text} </Text>
            <View
              style={{
                height:  screen.height,
                width:  screen.width,
  
              }}

            >
              <View 
                style={{
                  position: "absolute",
                  top: this.initialPosition.y,
                  left: this.initialPosition.x,
                  backgroundColor: "red",
                  borderRadius: 50,
                  height: 60,
                  width: 60,
                }}
                
                onLongPress={this._onLongPressButton}
                onStartShouldSetResponder={(evt) => true}
                onMoveShouldSetResponder={(evt) => true}
                onResponderMove={this._handleDrag}
                onResponderRelease={(evt) => { this._closeMenu() }}
              >
              </View>
            </View>

            <Animated.View 
                style={{
                  position: "absolute",
                  top: this.state.first.y,
                  left: this.state.first.x,
                  backgroundColor: "red",
                  borderRadius: 50,
                  height: this.state.optionsSize,
                  width: this.state.optionsSize,
                }}>
            </Animated.View>

            <Animated.View 
                style={{
                  position: "absolute",
                  top: this.state.second.y,
                  left: this.state.second.x,
                  backgroundColor: "red",
                  borderRadius: 50,
                  height: this.state.optionsSize,
                  width: this.state.optionsSize,
                }}>
            </Animated.View>

            <Animated.View 
                style={{
                  position: "absolute",
                  top: this.state.third.y,
                  left: this.state.third.x,
                  backgroundColor: "red",
                  borderRadius: 50,
                  height: this.state.optionsSize,
                  width: this.state.optionsSize,
                }}>
            </Animated.View>
        </View>

    );
  }
}


        // <View style={styles.background}>
        //     {/* <LottieView source={anim} progress={this.state.progress} /> */}
        //     <LottieView 
        //         ref={animation => {
        //             this.animation = animation;
        //         }}
        //         source={ anim } 
        //         speed={ 1 }
        //         style={ styles.container }
        //         loop={ true }
        //     />
        // </View>