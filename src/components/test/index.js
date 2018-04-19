import React from 'react';
import { Animated, Easing, View } from 'react-native';
import LottieView from 'lottie-react-native';
import anim from '../../assets/anim/etoiles/data.json'
import perso from '../../assets/anim/perso/perso.json'
import styles from './styles';

export default class BasicExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
      progress1: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
    }).start();



      this.animation.play(0, 80);
  }

  render() {
    return (
        <View style={styles.background}>
            {/* <LottieView source={anim} progress={this.state.progress} /> */}
            <LottieView 
                ref={animation => {
                    this.animation = animation;
                }}
                source={ anim } 
                speed={ 1 }
                style={ styles.container }
                loop={ true }
            />
        </View>
    );
  }
}