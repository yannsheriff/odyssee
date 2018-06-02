
//  Import modules
// --------------------------------------------------------------
import React, { Component } from 'react'
import {
  Text,
  View,
  Button,
  TouchableHighlight,
  Alert
} from 'react-native'
import { connect } from 'react-redux'
import RNSimpleCompass from 'react-native-simple-compass'


//  Import Helpers
// --------------------------------------------------------------
import screen from '../../../helpers/ScreenSize'
import styles from './styles'
import renderIf from '../../../helpers/renderIf'

//  Import assets
// --------------------------------------------------------------
import { backgrounds } from '../../../assets/images'
import {animations} from '../../../assets/anim'

//  Import components
// --------------------------------------------------------------
import ParallaxLayout from '../ParallaxLayout'
import AnimationLayout from '../AnimationLayout'



export default class Collectables extends Component {

  constructor(props) {
    super(props)
    this.state = {
      collectables: [
        {
          id: 1,
          name: "Glyphes d'Éol",
          x: 100,
          y: 100
        },
        {
          id: 2,
          name: "Glyphes de zeus",
          x: 100,
          y: 200
      },
      {
          id: 3,
          name: "Glyphes zizi",
          x: 50,
          y: 60
      }
      ]
    }
  }

  componentWillReceiveProps(nextProps) {

  }

  

  render() {

    if (this.state.collectables.length > 0 ) {
      var collectables = this.state.collectables.map((collectable) => {
         if (this.state.collectables.length > 0) {
           return (
            <View 
              onStartShouldSetResponder={ (evt) => true }
              onResponderGrant={  (evt) => { 
                Alert.alert('bravo', 'vous avez trouvz la '+ collectable.name )
              } }
              // 
              style={{
                position: "absolute",
                width: 20,                
                height: 20,
                top: collectable.y,
                left: collectable.x,
                backgroundColor: 'red',
              }}
            />  
           )
         }
       })
     }
     
    return (
        <View style={ styles.container }>
            { collectables }
        </View>
    )
  }
}


