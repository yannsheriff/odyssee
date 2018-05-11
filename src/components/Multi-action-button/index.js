import React from 'react';
import { Animated, Easing, View, Button, TouchableWithoutFeedback, Image, Text, Alert } from 'react-native';
import LottieView from 'lottie-react-native';
import anim from '../../assets/anim/etoiles/data.json'
import perso from '../../assets/anim/perso/perso.json'
import styles from '../Multi-action-button/styles';
import { BlurView } from 'react-native-blur';
import images from '../../assets/images'
import AnimationLayout from '../Island/AnimationLayout'
import screen from '../../helpers/ScreenSize'
import { choices } from '../../assets/images'

export default class MultiActionButton extends React.Component {
  constructor(props) {
    super(props);

    this.callback = props.onChoiceSelected
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
      // buttonArray: this._prepareButtons([
      //   {
      //     img: 0,
      //     id: 1,
      //     label: "suce ma bite"
      //   },
      //   {
      //     img: 2,
      //     id: 1,
      //     label: "NIK theophile"
      //   },
      //   {
      //     img: 1,
      //     id: 1,
      //     label: "va acheter a boir"
      //   },
      // ])
      buttonArray: this._prepareButtons(this.props.actions)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.actions.img) {
      this.setState({
        buttonArray: this._prepareButtons(nextProps.actions)
      })
    }
  }



  /*
  * Format data & give them positions
  */ 
  _prepareButtons(array = []) {
    console.log(array.length)
    let payload = []
    if (array.length > 0) {
      if (array.img) {
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
      })
    }
  }

    return payload
  }

  /*
  * Animate buttons to there positions, and blur the bckground
  */ 
  _openMenu = () => {
    console.log("open")
    this.setState({
      opacity: 1
    })
    if (this.state.buttonArray.length > 0) {
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
  }


  /*
  * Animate buttons to there initial positions, restore inital state, and send call back
  */ 
  _closeMenu = () => {
    this.firstTouch = undefined;  
    this.menuIsOpen = false;
    this.setState({
      opacity: 0
    })
    if (this.state.buttonArray.length > 0) { 
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
    }

    if (this.state.chosenId) {
      console.log( this.state.chosenId)
      if (this.callback) {
        this.callback(this.state.chosenId)
      }
      this.setState({
        text: "",
        chosenId: undefined
      })
    }
  }

  
  
  /*
  * when user touch, is it long touch ? then colision detection with all choices 
  */ 
  _handleDrag = (evt) => {
      if (this.firstTouch) {
        if ( evt.nativeEvent.timestamp > this.firstTouch + 500) {
          if (!this.menuIsOpen) {
            this._openMenu()
            this.menuIsOpen = true
          }
          if (this.state.buttonArray.length > 0) {
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
        }
        
      } else {
        this.firstTouch = evt.nativeEvent.timestamp
      }
  }

  render() {
    var buttons = this.state.buttonArray.map((button) => {
      if (this.state.buttonArray.length > 0) {
        return (
          <Animated.Image 
              style={[styles.choiceImg, { 
                top: button.y, 
                left: button.x,
                height: this.state.optionsSize,
                width: this.state.optionsSize, 
              }]}

              resizeMode={'contain'}
              source={button.img}
              >
          </Animated.Image>
        )
      }
    })

    return (
        <View style={{
          width: screen.width,
          height: screen.height,
          justifyContent: "center",
          // backgroundColor: '#fff',
        }}>
            {/* <Image
              style={styles.absolute}
              source={images.home}
            /> */}
            <BlurView
                style={[styles.absolute, {opacity: this.state.opacity}]}
                viewRef={this.state.viewRef}
                blurType="light"
                blurAmount={10}
              />
              <Text
              style={styles.text}
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
                  backgroundColor: "white",
                  borderRadius: 50,
                  zIndex: 99,
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
