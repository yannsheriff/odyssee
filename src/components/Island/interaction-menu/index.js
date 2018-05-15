
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


//  Import actions
// --------------------------------------------------------------
import { goToStep } from '../../../actions/island'


//  Import Helpers
// --------------------------------------------------------------
import images from '../../../assets/images'
import screen from '../../../helpers/ScreenSize'
import styles from './styles'


//  Import Component
// --------------------------------------------------------------
import Swip from '../Swip'
import MultiActionButton from '../../Multi-action-button'

class InteractionMenu extends Component {

  constructor(props) {
    super(props)

    this.state = {
      style: props.style,
      actions: this.props.actions.snippets,
      actionsForButton: this._formatDataForActionButon(this.props.actions.snippets),
      haveAction: this.props.actions.haveAction,
      _changeStep: this.props.goToStep
    }

  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
      if (nextProps.actions.snippets.length > 0) {
        console.log("nextProps")
        this.setState({ 
          actions: nextProps.actions.snippets,
          actionsForButton: this._formatDataForActionButon(nextProps.actions.snippets),
          haveAction: nextProps.actions.haveAction
        }, () => console.log(this.state))
      }
  }

  _formatDataForActionButon(actions) {
    let payload = actions.map((action) => {
      return { id: action.id, img: action.choiceImgId, label: action.title}
    })
    return payload
  }

  _handleSwip = () => {
      console.log(this.state.actions[0].actions[0].id)
      this.state._changeStep(this.state.actions[0].actions[0].id)
  }




  render() {

    let swip = this.state.haveAction 
    ? null
    : <Swip
        style={ styles.swipReconizer }
        callback={ this._handleSwip }
      />

    return (
      <View style={styles.container}>
        
        <MultiActionButton
          actions={this.state.actionsForButton}
          // mainBtnStyle={}
          // initalPositon={}
          //labelStyle={}

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

          isActive={this.state.haveAction ? true : false}

          onChoiceSelected={(action) => { 
            this.state._changeStep(action) 
          }}
        />

        { swip }
        
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    goToStep: (id) => {
      dispatch(goToStep(id))
    },
  }
}

const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InteractionMenu)

export default componentContainer