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
    this.buttonSize = 50
    this.isHovered=[0]
    this.distFromInitialPosition = 120
    this.initialPosition = this.props.initalPositon 
    ? this.props.initalPositon
    : {
      x: screen.width/2 -25,
      y: screen.height - 70
    }
    this.positionReferenceMap = [
      [0],
      [45, -45],
      [-45, 0, 45]
    ]
    this.state = {
      opacity: 0,
      optionsSize: new Animated.Value(0),
      text: '',
      isOpen: false,
      isActive: this.props.isActive !== undefined ? this.props.isActive : true, 
      chosenId: undefined,
      buttonArray: this._prepareButtons(this.props.actions),
      btnStyle: this.props.mainBtnStyle, 
      customBtnOpen: this.props.mainBtnOpen,
      customBtnDisabled: this.props.disabled,
      customBtn: this.props.mainButton,
      textStyle: this.props.labelStyle,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.actions[0].img) {
      this.setState({
        buttonArray: this._prepareButtons(nextProps.actions)
      })
    } 

    if (nextProps.isActive !== undefined) {
      this.setState({
        isActive: nextProps.isActive
      })
    }
  }



  /*
  * Format data & give them positions
  */ 
  _prepareButtons(array = []) {
    let payload = []
    if (array.length > 0) {
      if (array[0].img) {
      let nbOfButtons = array.length - 1
      array.forEach((data, index) => {
        payload.push(
          {
            x: new Animated.Value(this.initialPosition.x),
            y: new Animated.Value(this.initialPosition.y),
            x1: this.initialPosition.x + this.distFromInitialPosition * Math.sin(this.positionReferenceMap[nbOfButtons][index] * (Math.PI / 180)),
            y1: this.initialPosition.y - this.distFromInitialPosition * Math.cos(this.positionReferenceMap[nbOfButtons][index] * (Math.PI / 180)),
            img: choices[data.img].img,
            label: data.label,
            isHovered: false,
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
    this.setState({
      opacity: 1, 
      isOpen: true
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
      opacity: 0,
      text: "",
      isOpen: false
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
      Animated.parallel(animationsToPlay).start(()=> {
        if (this.state.chosenId) {
          this.setState({
            chosenId: undefined,
            buttonArray: []
          })
        }
      });
    }

    if (this.state.chosenId) {
      if (this.callback) {
        this.callback(this.state.chosenId)
      }
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

              if(this.isHovered.length > 9) {
                this.isHovered.splice(0, 3)
              }

            
            this.state.buttonArray.forEach((button, index) => { // loop for dection 
              if ( evt.nativeEvent.pageX > button.x1 
                && evt.nativeEvent.pageX < button.x1 + this.buttonSize
                && evt.nativeEvent.pageY > button.y1
                && evt.nativeEvent.pageY < button.y1 + this.buttonSize 
              ) {

                this.isHovered.push(1)

                if(button.isHovered === false) {  // animate btn 

                  button.isHovered = true
                  let newValueX = this.initialPosition.x + (this.distFromInitialPosition + 30) * Math.sin(this.positionReferenceMap[this.state.buttonArray.length-1][index] * (Math.PI / 180))
                  let newValueY = this.initialPosition.y - (this.distFromInitialPosition + 30) * Math.cos(this.positionReferenceMap[this.state.buttonArray.length-1][index] * (Math.PI / 180))
                  Animated.parallel([
                    Animated.timing(button.y, {
                      toValue: newValueY, 
                      easing: Easing.in,
                      duration: 200,
                    }),
                    Animated.timing(button.x, {
                      toValue: newValueX, 
                      easing: Easing.in,
                      duration: 200,
                    })
                  ]).start()
                }
              

                this.setState({  // Set text on screen and id in the state
                  text: button.label,
                  chosenId: button.id
                })


              }  else if (this.isHovered.reduce(function(acc, val) { return acc + val; }) < 1) { // if nothing is hovered

                this.state.buttonArray.forEach((button, index) => {
                  if(button.isHovered) {
                   
                    button.isHovered = false
                    Animated.parallel([
                      Animated.timing(button.x, {
                        toValue: button.x1, 
                        duration: 200,
                      }),
                      Animated.timing(button.y, {
                        toValue: button.y1, 
                        duration: 200,
                      }),
                    ]).start()
                  }
                })
                this.setState({
                  text: "",
                  chosenId: undefined
                })
              } else {
                
                this.isHovered.push(0)
              }
            })
          }
        }
        
      } else {
        this.firstTouch = evt.nativeEvent.timestamp
      }
  }

  async _unHoverBtn(index) {
   
  }


/* ===============================================================
======================= RENDER FUNCTION =======================
================================================================ */



  render() {
    let customBtn = null
    if(this.state.customBtn || this.state.customBtnOpen || this.state.customActiveBtn ) {
      if(this.state.isOpen && this.state.customBtnOpen) {
        customBtn = this.state.customBtnOpen
      } else if (this.state.customBtn && this.state.isActive) {
        customBtn = this.state.customBtn
      } else if (this.state.customBtnDisabled) {
        customBtn = this.state.customBtnDisabled
      }
    }

    if (this.state.buttonArray.length > 0 ) {
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
    }


    return (
        <View style={{
          width: screen.width,
          height: screen.height,
          justifyContent: "center",
        }}>
            <BlurView
                style={[styles.absolute, { opacity: this.state.opacity }]}
                viewRef={this.state.viewRef}
                blurType="dark"
                blurAmount={10}
              />
              <Text
              style={[ styles.text, this.state.textStyle ]}
              >  {this.state.text} </Text>
            <View
              style={{
                height:  screen.height,
                width:  screen.width,
  
              }}

            >
              <View 
                style={[{
                  position: "absolute",
                  top: this.initialPosition.y,
                  left: this.initialPosition.x,
                  backgroundColor: "transparent",
                  borderRadius: 50,
                  zIndex: 99,
                  height: this.buttonSize,
                  width: this.buttonSize,
                  
                }, this.state.btnStyle ]}
                
                onLongPress={this._onLongPressButton}
                onStartShouldSetResponder={(evt) => true}
                onMoveShouldSetResponder={(evt) => true}
                onResponderMove={this._handleDrag}
                onResponderRelease={(evt) => { this._closeMenu() }}
              >
                { customBtn }

              </View>
            </View>
            
            { buttons }

        </View>

    );
  }
}
