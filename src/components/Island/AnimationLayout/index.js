import React from 'react';
import { Animated, Easing, View } from 'react-native';
import LottieView from 'lottie-react-native';


import styles from './styles';
import screen from '../../../helpers/ScreenSize'

export default class BasicExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // progress: new Animated.Value(0),
      animations: [
        {
          color: "#f82345",
          position: new Animated.Value(0),
        }
      ],
    };
  }

  componentDidMount() {

    console.log(this.state)

  }

  componentWillReceiveProps (nextProps) {
    if(nextProps.animations) {
      this.setState({ animations:[
        {
          color: nextProps.animations, 
          position: new Animated.Value(screen.width)
        }, 
        ...this.state.animations
        ]
      }, function () {

          Animated.parallel([
            Animated.timing(this.state.animations[1].position, {
              duration: 3000,
              toValue: -screen.width, 
            }),
            Animated.timing(this.state.animations[0].position, {
              duration: 3000,
              toValue: 0,
            }),
          ]).start(()=> {
            this.setState({ animations: [this.state.animations.shift()]})
          }); 
      })
    }
  }

  render() {
      var animations = this.state.animations.map((anim) => {
        return (
          <Animated.View style={[styles.background, { backgroundColor: anim.color,  left: anim.position}]}>
          </Animated.View>
        );
      })

      return (
        <View>
          { animations }
        </View>
    );
  }
}