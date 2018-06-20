import React from 'react';
import { View, Text, Animated, Alert } from 'react-native';
import Video from "react-native-video";
import { NavigationActions } from "react-navigation";
import styles from './styles';
// const videoToplay = require ('../../assets/video/test.mp4')/
export default class IntroductionVideo extends React.Component {
  constructor(props) {
    super(props);

    this.tap = 0
    
    this.state = {
      opacity: new Animated.Value(1),
      paused: false,
    }
    
  }


  componentWillReceiveProps (nextProps) {
    if(nextProps.notification.title) {

    }
  }

  componentDidMount() {
    Animated.timing(this.state.opacity, {
      delay: 3000,
      duration: 2000,
      toValue: 0,
    }).start()
  }

  navigateToSailing = () => {
    const navigate = NavigationActions.navigate({
      routeName: 'Sailing',
      params: {}
    });
    this.props.navigation.dispatch(navigate);
  };

  didTap() {
    this.tap = this.tap + 1
    if(this.tap > 1) {
      this.setState({paused: true})
      this.navigateToSailing()
    }
    setTimeout(()=> {
      this.tap = 0
    }, 500)
  }



  render() {

      return (
        <View style={ styles.container}>
          <Video source={ require('../../assets/video/test.mp4') }   // Can be a URL or a local file.
            resizeMode={"cover"}
              ref={(ref) => {
                this.player = ref
              }}                                      // Store reference
              // playInBackground={true}           // Audio continues to play when app entering background. Default false
              // playWhenInactive={true}           // [iOS] Video continues to play when control or notification center are shown. Default false
              // onBuffer={this.onBuffer}                // Callback when remote video is buffering
              onEnd={this.navigateToSailing}                      // Callback when playback finishes
              // onError={this.videoError}               // Callback when video cannot be loaded
              // onFullscreenPlayerWillPresent={this.fullScreenPlayerWillPresent} // Callback before fullscreen starts
              // onFullscreenPlayerDidPresent={this.fullScreenPlayerDidPresent}   // Callback after fullscreen started
              // onFullscreenPlayerWillDismiss={this.fullScreenPlayerWillDismiss} // Callback before fullscreen stops
              // onFullscreenPlayerDidDismiss={this.fullScreenPlayerDidDismiss}  // Callback after fullscreen stopped
              // onLoadStart={this.loadStart}            // Callback when video starts to load
              // onLoad={this.setDuration}               // Callback when video loads
              // onProgress={this.setTime}               // Callback every ~250ms with currentTime
              // onTimedMetadata={this.onTimedMetadata}  // Callback when the stream receive some metadata
              paused={this.state.paused}
              style={styles.backgroundVideo} />
              <Animated.Text style={[styles.text, { opacity: this.state.opacity }]}> Appuyer deux fois pour passer </Animated.Text>
              <View 
                style={styles.container}
                onStartShouldSetResponder={ (evt) => true }
                onResponderGrant={  (evt) => { 
                  this.didTap(evt)
                } }
              />
        </View>
    );
  }
}
