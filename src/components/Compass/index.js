
import React, { Component } from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native'

import Images from '../../assets/images'
import screen from '../../helpers/ScreenSize'
import styles from './styles'



export default class Compass extends Component {

  constructor(props) {
    super(props)

    this.state = {
      updateOrientation: this.props.updateOrientation
    }
  }

  componentDidUpdate() {
    console.log('update')
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <View>
        <Button
          onPress={this.state.updateOrientation.bind(this, 20)}
          title={'change orientation'}
        />
      </View>
    );
  }
}