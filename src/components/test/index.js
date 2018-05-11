import React from 'react';
import { Animated, Easing, View, Button, TouchableWithoutFeedback, Image, Text, Alert } from 'react-native';
import LottieView from 'lottie-react-native';
import anim from '../../assets/anim/etoiles/data.json'
import perso from '../../assets/anim/perso/perso.json'
import styles from './styles';
import { BlurView } from 'react-native-blur';
import images from '../../assets/images'
import AnimationLayout from '../Island/AnimationLayout'
import screen from '../../helpers/ScreenSize'
import { choices } from '../../assets/images'

export default class BasicExample extends React.Component {
  constructor(props) {
    super(props);
    this.firstTouch = undefined
    this.menuIsOpen = false
    this.initialPosition = {
      x: screen.width/2 -30,
      y: screen.height - 100
    }
    this.buttonSize = 60
    this.positionReferenceMap = [
      [
        {
          x: 0,
          y: -110
        }
      ],
      [
        {
          x: -45,
          y: -110
        }, 
        {
          x: 45,
          y: -110
        }
      ],
      [
        {
          x: -90,
          y: -80
        }, 
        {
          x: 0,
          y: -110
        }, 
        {
          x: 90,
          y: -80
        }
      ]
    ]
    this.state = {
      opacity: 0,
      optionsSize: new Animated.Value(0),
      text: '',
      chosenId: undefined,
      buttonArray: this._prepareButtons([
        {
          id: 1,
          img: 0,
          label: 'prendre la lance'
        }, 
        {
          id: 2,
          img: 2,
          label: 'prendre l\'arc'
        }, 
        {
          id: 3,
          img: 1,
          label: 'Continuer'
        }, 
        
      ])
    };
  }

  _prepareButtons(array) {
    let payload = []
    let nbOfButtons = array.length - 1
    array.forEach((data, index) => {
      payload.push(
        {
          x: new Animated.Value(this.initialPosition.x),
          y: new Animated.Value(this.initialPosition.y),
          x1: this.initialPosition.x + this.positionReferenceMap[nbOfButtons][index].x,
          y1: this.initialPosition.y + this.positionReferenceMap[nbOfButtons][index].y,
          img: choices[data.img].img,
          label: data.label,
          id: data.id
        }, 
      )
      console.log(choices[data.img])
    })

    return payload
  }


  _openMenu = () => {
    this.setState({
      opacity: 1
    })
    let animationsToPlay = this.state.buttonArray.reduce(function(payload, button) {
      payload.push(
        Animated.spring(button.x, {
          toValue: button.x1, 
          duration: 1000,
        }),
        Animated.spring(button.y, {
          toValue: button.y1, 
          duration: 1000,
        })
      )
      return payload;
    }, []);
    animationsToPlay.push(
      Animated.spring(this.state.optionsSize, {
        duration: 1000,
        toValue: this.buttonSize, 
      })
    )
    Animated.parallel(animationsToPlay).start();
  }



  _closeMenu = () => {
    this.firstTouch = undefined;  
    this.menuIsOpen = false;
    this.setState({
      opacity: 0
    })
    let animationsToPlay = this.state.buttonArray.reduce((payload, button) => {
      payload.push(
        Animated.spring(button.x, {
          toValue: this.initialPosition.x, 
          duration: 1000,
        }),
        Animated.spring(button.y, {
          toValue: this.initialPosition.y, 
          duration: 1000,
        })
      )
      return payload;
    }, []);
    animationsToPlay.push(
      Animated.spring(this.state.optionsSize, {
        duration: 1000,
        toValue: 0, 
      })
    )
    Animated.parallel(animationsToPlay).start();

    if (this.state.chosenId) {
      console.log( this.state.id)
      Alert.alert(
        'choice made',
        this.state.text,
      )
      this.setState({
        text: "",
        chosenId: undefined
      })
    }
  }

  
  

  _handleDrag = (evt) => {
      if (this.firstTouch) {
        if ( evt.nativeEvent.timestamp > this.firstTouch + 900) {
          if (!this.menuIsOpen) {
            this._openMenu()
            this.menuIsOpen = true
          }
          let isHovered = [0]
          this.state.buttonArray.forEach((button, index) => { // loop for dection 
            if ( evt.nativeEvent.pageX > button.x1 
              && evt.nativeEvent.pageX < button.x1 + this.buttonSize
              && evt.nativeEvent.pageY > button.y1
              && evt.nativeEvent.pageY < button.y1 + this.buttonSize 
            ) {
              isHovered[index] = 1
              this.setState({
                text: button.label,
                chosenId: button.id
              })
            } else if (isHovered.reduce(function(acc, val) { return acc + val; }) < 1) { // if nothing is hovered
              this.setState({text: ""})
            }
          }, () => {
            isHovered = []
          })
        }
        
      } else {
        this.firstTouch = evt.nativeEvent.timestamp
      }
  
    
  }

  render() {
    var buttons = this.state.buttonArray.map((button) => {
        return (
          <Animated.Image 
              style={{
                position: "absolute",
                top: button.y,
                left: button.x,
                resizeMode: 'contain',
                height: this.state.optionsSize,
                width: this.state.optionsSize,
              }}

              resizeMode={'contain'}
              source={button.img}
              >
          </Animated.Image>
        )
    })

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
                  height: this.buttonSize,
                  width: this.buttonSize,
                }}
                
                onLongPress={this._onLongPressButton}
                onStartShouldSetResponder={(evt) => true}
                onMoveShouldSetResponder={(evt) => true}
                onResponderMove={this._handleDrag}
                onResponderRelease={(evt) => { this._closeMenu() }}
              >
              </View>
            </View>
            
            { buttons }

        </View>

    );
  }
}
