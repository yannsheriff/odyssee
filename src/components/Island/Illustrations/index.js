
//  Import modules
// --------------------------------------------------------------
import React, { Component } from 'react'
import {
  Text,
  View,
  Button,
} from 'react-native'
import { connect } from 'react-redux'
import RNSimpleCompass from 'react-native-simple-compass'


//  Import Helpers
// --------------------------------------------------------------
import { backgrounds } from '../../../assets/images'
import screen from '../../../helpers/ScreenSize'
import styles from './styles'

//  Import components
// --------------------------------------------------------------
import ParallaxLayout from '../ParallaxLayout'



export default class Illustrations extends Component {

  constructor(props) {
    super(props)
    console.log('Illustration : ', props.offsets)
    this.state = {
      offsets: {
        first: props.offsets.first,
        middle: props.offsets.middle,
        back: props.offsets.back,
      },
      image: props.source
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.offsets && nextProps.offsets !== this.state.offsets) {
      this.setState({
        offsets: {
          first: nextProps.offsets.first,
          middle: nextProps.offsets.middle,
          back: nextProps.offsets.back,
        }
      })
    }
  }



  render() {

    return (
        <View style={ styles.container }>
          <ParallaxLayout 
            source={backgrounds.test.p3}
            offsetX={this.state.offsets.back}
          />
          <ParallaxLayout 
            source={backgrounds.test.p2}
            offsetX={this.state.offsets.middle}
          />
          <ParallaxLayout 
            source={backgrounds.test.p1}
            offsetX={this.state.offsets.first}
          />
          {/* <Button 
            onPress={ ()=> {
              this.setState({ offset: {
                  first: -300, 
                  middle: -200, 
                  back: -100
                } 
              })
            }}
            title={'test'}
          /> */}
        </View>
    )
  }
}


