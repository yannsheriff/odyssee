import React from 'react';
import { Animated, Easing, View, Button } from 'react-native';
import LottieView from 'lottie-react-native';
import anim from '../../assets/anim/etoiles/data.json'
import perso from '../../assets/anim/perso/perso.json'
import styles from './styles';


import AnimationLayout from '../Island/AnimationLayout'

export default class BasicExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      next: 0, 
      anim: [ anim, perso ]
    };
  }


  next = () => {
    var rand = Math.floor(Math.random() * 2) 
    console.log(rand)
    this.setState({
      next: rand
    })
  }

  render() {
    return (
        <View style={styles.container}>
          <AnimationLayout 
            nextAnimation={ anim }
            animationDuration={ 1000 } 
            transitionDuration={ 1000 }
            loop={ true }
          />
          <View style={{ backgroundColor: "#ff0000", width: 50, height: 50, marginLeft: 100, marginTop: 100 }}></View>
          <Button
            title={'next'}
            onPress={this.next}
            style={{marginLeft: 100, marginTop: 100}}
          />
        </View>

    );
  }
}


        // <View style={styles.background}>
        //     {/* <LottieView source={anim} progress={this.state.progress} /> */}
        //     <LottieView 
        //         ref={animation => {
        //             this.animation = animation;
        //         }}
        //         source={ anim } 
        //         speed={ 1 }
        //         style={ styles.container }
        //         loop={ true }
        //     />
        // </View>