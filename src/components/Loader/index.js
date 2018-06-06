import React from 'react';
import { Animated, Easing, View, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { connect } from 'react-redux'
import ReactNativeHaptic from 'react-native-haptic';
import { BlurView } from 'react-native-blur'

import styles from './styles';

class VisualNotification extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      haveNotification: false,
      title: null,
      subtitle: null,
      source: null,
      progress: new Animated.Value(0),
      displayText: 0
    }
    
  }


  componentWillReceiveProps (nextProps) {

  }

  componentDidMount() {
    
  }

  closeNotification = () => {

  }
  



  render() {
      
    if (this.state.haveNotification) {
      var notification = <View 
        style={ styles.container}
        >

        <BlurView
            style={styles.absolute}
            viewRef={this.state.viewRef}
            blurType="light"
            blurAmount={20}
          />

       
        <View style={styles.animation}>
          <LottieView
            resizeMode="contain"
            progress={this.state.progress}
            source={this.state.source}
            loop={false}
            style={styles.animation}
          />
        </View>
        <Text style={[ styles.title, { opacity: this.state.displayText } ]}>{ this.state.title }</Text>
        <Text style={[ styles.subtitle, { opacity: this.state.displayText } ]}>{ this.state.subtitle }</Text>
        <Text style={[ styles.subtitle2, { opacity: this.state.displayText } ]}>{ this.state.subtitle2 }</Text>
        <View 
          style={styles.absolute } 
          onStartShouldSetResponder={ (evt) => true }
          onResponderGrant={  (evt) => { 
            this.closeNotification()
          }}/> 
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
