
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
import RNSimpleCompass from 'react-native-simple-compass';

//  Import actions
// --------------------------------------------------------------

import { goToStep } from '../../../actions/island'

//  Import Helpers
// --------------------------------------------------------------
import images from '../../../assets/images'
import screen from '../../../helpers/ScreenSize'
import styles from './styles'



class InteractionMenu extends Component {

  constructor(props) {
    super(props)

    this.state = {
      actions: this.props.actions,
      _changeStep: this.props.goToStep
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.actions !== this.state.actions) {
      this.setState({ actions: nextProps.actions })
    }
  }





  render() {
    console.log(this.state.actions)
    if (this.state.actions) {
      var actions = this.state.actions.map((action) => {
        return (<Button title={action.title} onPress={ () => { this.state._changeStep(action.id) }} />);
      })
    }

    return (
        <View style={ styles.container }>
          <View style={{opacity: actions ? 0 : 1}} >
            <Text> pas daction </Text>
          </View>
          <Button 
            title={'exit'}
          />
          { actions }
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
