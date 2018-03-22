
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


import { updateOrientation } from '../../actions/sailing'


import Images from '../../assets/images'
import screen from '../../helpers/ScreenSize'
import styles from './styles'



class Compass extends Component {

  constructor(props) {
    super(props)

    this.state = {
      updateOrientation: this.props.updateOrientation
    }
    console.log(props)
  }

  componentDidUpdate() {
    console.log('update Compass')
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <View>
        <Button
          onPress={this.state.updateOrientation.bind(this, 20)}
          title={'change orientation'}
        />
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