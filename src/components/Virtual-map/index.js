
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

import Images from '../../assets/images'
import screen from '../../helpers/ScreenSize'
import styles from './styles'


class VirtualMap extends Component {

  constructor(props) {
    super(props)

    this.state = {
      orientation: this.props.sailing.orientation
    }
  }

  componentDidUpdate(nextProps) {
    console.log('update MAP')
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ orientation: nextProps.sailing.orientation })
  }

  render() {
    return (
      <View>
        <Text style={styles.welcome}>
          My orientation : {this.state.orientation}
        </Text>
      </View>
    );
  }
}


/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */ 

const mapStateToProps = state => {
  return {
    sailing: state.sailing
  }
}

const componentContainer = connect(
  mapStateToProps
)(VirtualMap)

export default componentContainer