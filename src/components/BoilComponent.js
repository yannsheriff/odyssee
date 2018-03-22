
import React, { Component } from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native'

import Images from '../assets/images'
import screen from '../helpers/ScreenSize'
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class BoilComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      changeScreen: this.props.changeScreen,
      backgroundColor: '#FFD87B',
      image: Images.slice
    }
  }

  componentWillReceiveProps(nextProps) {
    switch(nextProps.screenState.screen) {
      case 0 : 
        this.setState({
          backgroundColor: '#FFD87B',
          image: Images.slice
        })
        break
      case 1 : 
        this.setState({
          backgroundColor: '#fff',
          image: Images.astronaut
        })
        break
      case 2 : 
        this.setState({
          backgroundColor: '#FF5A55',
          image: Images.vehicules
        })
        break
    }
  }

  render() {
    return (
      <View style={{
        backgroundColor: this.state.backgroundColor,    
        height: screen.height,
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 50
        }}>
        <Image
          style={{ width: 300, height: 300 }}
          source={this.state.image}
        />
        <Text style={styles.welcome}>
          Welcome My React Native Boilerplate!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit BoilerComponent.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
        <Button
          onPress={this.state.changeScreen}
          title={'Change color'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
