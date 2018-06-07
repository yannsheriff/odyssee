
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
} from 'react-native'
import { connect } from 'react-redux'

//  Import Helpers
// --------------------------------------------------------------
import images from '../../../assets/images'
import screen from '../../../helpers/ScreenSize'
import styles from './styles'


//  Import Component
// --------------------------------------------------------------
import Swip from '../Swip'
import MultiActionButton from '../../Multi-action-button'

import { choices } from '../../../assets/images'



export default class InteractionMenu extends Component {

  constructor(props) {
    super(props)

    this.state = {

      style: props.style,
      actions: this.props.actions.snippets,
      actionsForButton: this._formatDataForActionButon(this.props.actions.snippets),
      haveAction: this.props.actions.haveAction,
      opacity: 0,
      _changeStep: this.props.changeStep,
      _prevStep: this.props.prevStep,
      nextAction: null
    }

  }

  componentWillReceiveProps(nextProps) {
      if (nextProps.actions.snippets.length > 1) {
        this.setState({ 
          actions: nextProps.actions.snippets,
          actionsForButton: this._formatDataForActionButon(nextProps.actions.snippets),
          haveAction: nextProps.actions.haveAction
        })
      } else {
        this.setState({ 
          nextAction: nextProps.actions.snippets[0].id,
          haveAction: nextProps.actions.haveAction
        })
      }
  }

  _formatDataForActionButon(actions) {
    
    let payload = actions.map((action) => {
      if (action.choiceImgId !== undefined) {
        return { id: action.id, img: choices[action.choiceImgId].img, label: action.title}
      }
    })
    return payload
  }

  _nextStep = () => {
    if(!this.state.haveAction) {
      this.state._changeStep(this.state.nextAction)
    }
  }
  _prevStep = () => {
    this.state._prevStep()
  }






  render() {

    return (
      <View style={styles.container}>
        
        <Swip
          style={ styles.swipReconizer }
          onSwipRight={ this._prevStep }
          onSwipLeft={ this._nextStep }
        />

        <MultiActionButton
          actions={this.state.actionsForButton}
          // mainButtonsSize={10}
          // actionsButtonsSize={50}
          // mainBtnStyle={}
          // initalPositon={}
          // labelStyle={}
          
          // onButtonPressed={}
          // onButtonReleased={} 

          mainButton={
            <Image
              source={images.openMenu}
              resizeMethod={"contain"}
              style={{height: 50, width: 50}}
            />
          }
          
          mainBtnOpen={
            <Image
              source={images.closeMenu}
              resizeMethod={"contain"}
              style={{height: 50, width: 50}}
            />
          }

          disabled={
            <Image
              source={images.openMenu}
              resizeMethod={"contain"}
              style={{height: 50, width: 50, opacity: 0.1}}
            />
          }

          isActive={this.state.haveAction}

          onChoiceSelected={(action) => { 
            this.state._changeStep(action) 
          }}
        />

        
        
      </View>
    );
  }
}