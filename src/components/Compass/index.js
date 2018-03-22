
//  Import modules
// --------------------------------------------------------------
import React, { Component } from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native'
import { connect } from 'react-redux'
import RNSimpleCompass from 'react-native-simple-compass';

//  Import actions
// --------------------------------------------------------------
import { updateOrientation } from '../../actions/sailing'

//  Import Helpers
// --------------------------------------------------------------
import images from '../../assets/images'
import screen from '../../helpers/ScreenSize'
import styles from './styles'



class Compass extends Component {

  constructor(props) {
    super(props)

    this.state = {
      _updateOrientation: this.props.updateOrientation,
      compassSensitivity: 1,
      orientation: 0,
      isCompassLocked: true
    }
  }

  /*
  * Activate direction detection
  */
  componentDidMount() {
    this._toggleCompassLock()
  }

  /*
  * Dispatch action to virtual map
  */
  componentDidUpdate() {
    console.log('update Compass')
    this.state._updateOrientation(this.state.orientation)
  }

  /*
  * Toggle the direction detection
  */
  _toggleCompassLock = () => {
    if (this.state.isCompassLocked) {
      this.setState({isCompassLocked: false})
      RNSimpleCompass.start(this.state.compassSensitivity, (degree) => {
        this.setState({orientation: degree})
      });
    } else {
      this.setState({isCompassLocked: true})
      RNSimpleCompass.stop()
    }
  }


  /*
  * Handle the rotation of the compass on the drag event
  */
  _handleCompassDrag = (evt) => {
    if (this.state.isCompassLocked) {
      if (this.touchLastPos) {
        var diffBetweenLastAndNewPos = this.touchLastPos - evt.nativeEvent.pageX          
        var newOrientation = this.state.orientation + diffBetweenLastAndNewPos / 4
        this.setState({orientation: newOrientation})
        this.touchLastPos = evt.nativeEvent.pageX  
      } else {
        this.touchLastPos = evt.nativeEvent.pageX 
      }
    }
  }


  render() {
    return (
      <View>
        <View style={styles.container} >
          <Text> {this.state.orientation}</Text>
          <Button
            onPress={this._toggleCompassLock}
            title={this.state.isCompassLocked ? 'unlock' : 'lock'}
          />
          <View
            onStartShouldSetResponder={(evt) => true}
            onMoveShouldSetResponder={(evt) => true}
            onResponderMove={this._handleCompassDrag}
            onResponderRelease={(evt) => { this.touchLastPos = undefined }}
            style={[styles.compassResponder, { transform: [{ rotate: -this.state.orientation + 'deg' },] }]}
          >
            <Image
              style={styles.compass}
              source={images.compass}
              resizeMethod="scale"
            />
          </View>
        </View>
      </View>
    );
  }
}



/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    updateOrientation: (orientation) => {
      dispatch(updateOrientation(orientation))
    }
  }
}

const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Compass)

export default componentContainer