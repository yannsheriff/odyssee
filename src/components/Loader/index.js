import React from 'react';
import { Animated, Easing, View, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { connect } from 'react-redux'
import ReactNativeHaptic from 'react-native-haptic';
import { BlurView } from 'react-native-blur'
import { loaderAnim } from '../../assets/anim'

import styles from './styles';

export default class Loader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anim: new Animated.Value(0),
      opacity: new Animated.Value(1),
    }
    
  }
  componentDidMount() {

    Animated.sequence([
      Animated.timing(this.state.anim, {
        toValue: 1, 
        duration: 1500,
      }),
      Animated.timing(this.state.opacity, {
        toValue: 0, 
        duration: 1000,
      })
    ]).start()

  }

  render() {
      return (
        <Animated.View  style={[ styles.container, { opacity: this.state.opacity }]}>
          <View style={styles.anim}> 
            <LottieView 
              style={styles.anim}
              source={ loaderAnim } 
              progress={this.state.anim}
            />
          </View>
        </Animated.View>
    );
  }
}

