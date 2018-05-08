
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

class InteractionMenu extends Component {

  constructor(props) {
    super(props)

    this.state = {
      style: props.style,
      actions: this.props.actions.snippets,
      haveAction: this.props.actions.haveAction,
      _changeStep: this.props.goToStep
    }
  }

  componentWillReceiveProps(nextProps) {
      if (nextProps.actions) {
        this.setState({ 
          actions: nextProps.actions.snippets,
          haveAction: nextProps.actions.haveAction
        })
      }
  }

  _handleSwip = () => {
    console.log(this.state.actions)
    this.state._changeStep(this.state.actions[0].actions[0].id)
  }




  render() {
    if (this.state.actions && this.state.haveAction) {
      console.log(this.state.actions)
      var actions = this.state.actions.map((action) => {
        return (<Button title={action.title} onPress={ () => { this.state._changeStep(action.id) }} />);
      })
    }

    return (
      <View style={styles.container}>
        <Swip
          style={ styles.swipReconizer }
          callback={ this._handleSwip }
        />
        <View style={ styles.menu }>
          { actions }
        </View>
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
