import React from 'react';
import { Animated, Easing, View, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { connect } from 'react-redux'
import ReactNativeHaptic from 'react-native-haptic';
import { BlurView } from 'react-native-blur'
import { microInteraction } from '../../assets/anim'

import styles from './styles';

export default class Loader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: new Animated.Value(0),
    }
    
  }
  componentDidMount() {
    Animated.spring(this.state.progress, {
      toValue: 1, 
      duration: 1000,
    })
  }




  render() {
      return (
        <View style={styles.container}>
          <View style={styles.anim}> 
            <LottieView 
              style={styles.anim}
              source={ microInteraction.actionMenu } 
              progress={this.state.progress}
            />
          </View>
        </View>
    );
  }
}

