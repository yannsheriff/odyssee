
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
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class Map extends Component {

  constructor(props) {
    super(props)

    this.state = {
      orientation: 0
    }
  }

  componentDidUpdate() {
    console.log('update')
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    this.setState({ orientation: nextProps.orientation })
  }

  render() {
    return (
      <View>
        <Text style={styles.welcome}>
          My orientation : {this.state.orientation}
        </Text>
      </View>
    );
  }
}