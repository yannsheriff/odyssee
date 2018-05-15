
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

//  Import Helpers
// --------------------------------------------------------------
import images from '../../../assets/images'
import screen from '../../../helpers/ScreenSize'
import styles from './styles'



export default class Narration extends Component {

  constructor(props) {
    super(props)
    this.state = {
      text: this.props.snippet.text
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.snippet.text !== this.state.text) {
      this.setState({ text: nextProps.snippet.text })
    }
  }



  render() {
    return (
        <View style={ styles.container }>
          <Text style={ styles.text }> {this.state.text} </Text>  
        </View>
    );
  }
}