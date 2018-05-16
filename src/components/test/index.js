import React from 'react'
import Svg,{ G, Rect, Image, Circle } from 'react-native-svg'
import screen from '../../helpers/ScreenSize'
import images, { backgrounds } from '../../assets/images'
import { AsyncStorage, View } from 'react-native';
import { storeService } from '../../helpers/saveData'

export default class BasicExample extends React.Component {
  constructor(props) {
    super(props);
    this.test = {
      visitedIsland:[
        {
          id: 1,
          screenReaded: [],
          actualSnippetId: 1,
          haveAction: false,
          haveObject: false,
        }
      ],
      navigation: {
        position: {
          x: 0,
          y: 0
        },
        collectableEquipped: []
      }

      
    }
    this.state = {}
  }


  componentDidMount() {
    // this.consoleDataSaved()
    this.consoleDataSaved()
    
  }

  async consoleDataSaved() {
    await storeService.save(this.test)

    console.log("Restore state 🔄")
  }
  

  render() {
    return (
      <View style={{backgroundColor: "white"}}>

      </View>
    );
  }
}
