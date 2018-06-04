import React from 'react';
import { Animated, Easing, View, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { connect } from 'react-redux'
import ReactNativeHaptic from 'react-native-haptic';

import styles from './styles';

class VisualNotification extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      haveNotification: false,
      title: null,
      subtitle: null,
      source: null
    }
    
  }


  componentWillReceiveProps (nextProps) {
    console.log('yo')
    if(nextProps.notification.title) {
      ReactNativeHaptic.generate('notification')
      this.setState({
        haveNotification: true,
        title: nextProps.notification.title,
        subtitle: nextProps.notification.subtitle ? nextProps.notification.subtitle : '',
        source: nextProps.notification.animation ? nextProps.notification.animation : null
      }, () => {
        if(nextProps.notification.animation) {
          this.animation.play();
          
        }
      })
    }
  }

  componentDidMount() {
    
  }

  closeNotification = () => {
    this.setState({haveNotification: false})
  }
  



  render() {
      
    if (this.state.haveNotification) {
      var notification = <View 
        style={ styles.container}
        onStartShouldSetResponder={ (evt) => true }
        onResponderGrant={  (evt) => { 
          this.closeNotification()
        }}>

        <Text style={ styles.title }>{ this.state.title }</Text>
        <Text style={ styles.subtitle }>{ this.state.subtitle }</Text>
        <View style={styles.animation}>
          <LottieView
            resizeMode="contain"
            ref={animation => {
              this.animation = animation;
            }}
            source={this.state.source}
            loop={false}
            style={styles.animation}
          />
        </View>
      </View>
    }

      return (
        <View style={{position: "absolute", top: 0}}>
          { notification }
        </View>
    );
  }
}


/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */

  const mapStateToProps = state => {
    return {
      notification: state.notification
    }
  }
   
  const componentContainer = connect(
    mapStateToProps
  )(VisualNotification)
  
  export default componentContainer
