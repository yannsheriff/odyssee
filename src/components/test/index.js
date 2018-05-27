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
      isOnIsland: 1,
      visitedIsland:[
        {
          id: 2,
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
    this.restoreData()
    // this.consoleDataSaved()
    // this.getPreviousSnipet()
    // this.handleIslandData()
    
  }

  async handleIslandData() {
    var savedData = storeService.getSaving()
    savedData.then((data)=> {
      var actualIslandSavedData = data.visitedIsland.find((island) => { 
        if( island.id === 1) { 
          return island 
        }
      })
      if (actualIslandSavedData ) {
        console.log("loadIsland")
      } else {
        console.log("Create island")
      }
    })
  
  }

  async consoleDataSaved() {
    let data = await storeService.getSaving()
    console.log(data)
  }

  async restoreData() {
    await storeService.save(this.test)

    console.log("Restore state 🔄")
  }

  getPreviousSnipet(state) {
    let array = [1, 2, 3, 4, 5, 6, 7, 6, 7, 6, 5, 6, 5]
    let current = 5
    let array2 = array.reverse()
    let prevSnippet = array2.find((screenID)=> {
      if(screenID < current) {
        return screenID
      }
    })
    console.log(prevSnippet)

  }
  

  render() {
    return (
      <View style={{backgroundColor: "white"}}>

      </View>
    );
  }
}
