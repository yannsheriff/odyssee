import React from 'react';
import { Animated, Easing, Text, View } from 'react-native';
import screen from '../../helpers/ScreenSize';
import styles from '../Multi-action-button/styles';
import { BlurView } from 'react-native-blur';
import ReactNativeHaptic from 'react-native-haptic';
import LottieView from 'lottie-react-native'
import renderIf from '../../helpers/renderIf'
import { microInteraction } from '../../assets/anim'

export default class MultiActionButton extends React.Component {
  constructor(props) {
    super(props);

    this.callback = props.onChoiceSelected
    this.firstTouch = undefined
    this.menuIsOpen = false
    this.isHovered=[0]
    this.buttonsOffset =  this.props.buttonsOffset ? this.props.buttonsOffset : 120 
    this.actionsButtonsSize = this.props.actionsButtonsSize ? this.props.actionsButtonsSize: 70
    this.mainButtonsSize = this.props.mainButtonsSize ? this.props.mainButtonsSize: 50
    this.onButtonPressed = this.props.onButtonPressed ? this.props.onButtonPressed : undefined
    this.onButtonReleased = this.props.onButtonReleased ? this.props.onButtonReleased : undefined
    this.onPress = this.props.onOpen ? this.props.onPress : function() {}
    this.haveCallToAction = this.props.haveCallToAction ? true : false
    this.blurView = this.props.blurView ? true : false
    this.initialPosition = this.props.initalPositon 
    ? this.props.initalPositon
    : {
      x: screen.width/2 - this.mainButtonsSize/2,
      y: screen.height - 80
    }
    this.positionReferenceMap = [
      [0],
      [45, -45],
      [-45, 0, 45]
    ]

    if (props.actions && props.actions.length > 0  && props.isActive || props.actions.length > 0  && props.isActive == undefined) {
      var buttonArray = this._prepareButtons(this.props.actions)
    } else {
      var buttonArray = []
    }

    this.state = {
      opacity: 0,
      optionsSize: new Animated.Value(0),
      text: '',
      isOpen: false,
      isActive: this.props.isActive !== undefined ? this.props.isActive : true, 
      blurView: this.blurView,
      chosenId: undefined,
      buttonArray: buttonArray ,
      btnStyle: this.props.mainBtnStyle, 
      customBtnOpen: this.props.mainBtnOpen,
      customBtnDisabled: this.props.disabled,
      customBtn: this.props.mainButton,
      textStyle: this.props.labelStyle,
    };
  }

  componentDidMount() {
    if(this.state.isActive && this.haveCallToAction) {
      this.animationAction.play()
    } 
  }

  componentDidUpdate(prevState) {
    if(this.state.isActive && this.haveCallToAction) {
      this.animationAction.play()
    } 
    if(prevState.isOpen !== this.state.isOpen) {
      if(this.state.isOpen && this.onButtonPressed ) { this.onButtonPressed() }
      else if (this.onButtonReleased) { this.onButtonReleased() }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.actions && nextProps.actions.length > 0  && nextProps.isActive || nextProps.actions.length > 0  && nextProps.isActive == undefined) {
      this.setState({
        buttonArray: this._prepareButtons(nextProps.actions)
      })
    } else {
      this.setState({
        buttonArray: []
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
      if (array[0].img !== undefined) {
      let nbOfButtons = array.length - 1
      array.forEach((data, index) => {
        payload.push(
          {
            id: index,
            x: new Animated.Value(this.initialPosition.x + this.actionsButtonsSize/2 ),
            y: new Animated.Value(this.initialPosition.y - this.actionsButtonsSize/2 ),
            x1: this.initialPosition.x + this.mainButtonsSize/2 - this.actionsButtonsSize/2  + this.buttonsOffset * Math.sin(this.positionReferenceMap[nbOfButtons][index] * (Math.PI / 180)),
            y1: this.initialPosition.y + this.actionsButtonsSize/2 - this.actionsButtonsSize/2 - this.buttonsOffset * Math.cos(this.positionReferenceMap[nbOfButtons][index] * (Math.PI / 180)),
            img: data.img,
            label: data.label,
            isHovered: false,
            idToGo: data.id
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

    ReactNativeHaptic.generate('impact')
    // this.onPress()

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
          toValue: this.actionsButtonsSize, 
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
      isOpen: false,
      transitionFinished: false
    })
    if (this.state.buttonArray.length > 0) { 
      let animationsToPlay = this.state.buttonArray.reduce((payload, button) => {
        payload.push(
          Animated.timing(button.x, {
            toValue: this.initialPosition.x + this.actionsButtonsSize/2, 
            duration: 200,
            // easing: Easing.out
          }),
          Animated.timing(button.y, {
            toValue: this.initialPosition.y + this.actionsButtonsSize/2, 
            duration: 200,
            // easing: Easing.out
          })
        )
        return payload;
      }, []);
      animationsToPlay.push(
        Animated.timing(this.state.optionsSize, {
          duration: 200,
          toValue: 0,
        })
      )
      Animated.parallel(animationsToPlay).start(()=> {
        if (this.state.chosenId !== undefined) {
          if (this.callback) {
            this.callback(this.state.chosenId)
          }
          this.setState({
            chosenId: undefined,
            transitionFinished: true
          })
        }
      });
    }
  }

  
  
  /*
  * when user touch, is it long touch ? then colision detection with all choices 
  */ 
  _handleDrag = (evt) => { 
      if (this.firstTouch) {
        if ( evt.nativeEvent.timestamp > this.firstTouch + 10 + this.state.transitionFinished) {
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
                && evt.nativeEvent.pageX < button.x1 + this.actionsButtonsSize
                && evt.nativeEvent.pageY > button.y1
                && evt.nativeEvent.pageY < button.y1 + this.actionsButtonsSize 
              ) {

                this.isHovered.push(1)

                if(button.isHovered === false) {  // animate btn 

                  button.isHovered = true
                  let newValueX = this.initialPosition.x + this.mainButtonsSize/2 - this.actionsButtonsSize/2 + (this.buttonsOffset + 30) * Math.sin(this.positionReferenceMap[this.state.buttonArray.length-1][index] * (Math.PI / 180))
                  let newValueY = this.initialPosition.y + this.mainButtonsSize/2 - this.actionsButtonsSize/2  - (this.buttonsOffset + 30) * Math.cos(this.positionReferenceMap[this.state.buttonArray.length-1][index] * (Math.PI / 180))
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
                  ReactNativeHaptic.generate('selection')
                }
              

                this.setState({  // Set text on screen and id in the state
                  text: button.label,
                  chosenId: button.idToGo
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
                key={button.id}
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
          justifyContent: "center",
          position: "absolute",
          top: 0,
          left: 0,
        }}>

             {renderIf(this.state.isOpen,
              <BlurView
                style={styles.absolute}
                viewRef={this.state.viewRef}
                // blurType="regular"
                overlayColor={'e5e5e5'}
                blurAmount={10}
              />)}
            <Text
              style={[ styles.text, this.state.textStyle ]}
            >{this.state.text}</Text>
            <View>
              {renderIf(this.state.isActive && this.haveCallToAction,
                <View  style={[styles.animationContainer, { top: 
                  this.initialPosition.y - 75 + this.mainButtonsSize / 2, 
                  left:this.initialPosition.x - 75 + this.mainButtonsSize / 2
                }]}>
                  <LottieView 
                    style={ styles.animation }
                    source={ microInteraction.actionMenu } 
                    loop={ true }
                    speed={0.5}
                    ref={animation => {
                      this.animationAction = animation;
                    }}
                    />
                  </View>)}
              <View 
                style={[{
                  position: "absolute",
                  top: this.initialPosition.y,
                  left: this.initialPosition.x,
                  borderRadius: 50,
                  zIndex: 99,
                  height: this.mainButtonsSize,
                  width: this.mainButtonsSize
                }, this.state.btnStyle ]}
                
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
