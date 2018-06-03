import React from 'react'
import Svg,{ G, Rect, Image, Circle } from 'react-native-svg'
import screen from '../../helpers/ScreenSize'
import images, { backgrounds } from '../../assets/images'
import { AsyncStorage, View } from 'react-native';
import { storeService } from '../../helpers/saveData'
import LottieView from 'lottie-react-native'
import Collectables from '../Island/Collectables'

import { microInteraction } from '../../assets/anim'

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
    // this.restoreData()
    // this.consoleDataSaved()
    // this.getPreviousSnipet()
    // this.handleIslandData()
    this.lala()
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

  lala() {
    a = [1,2,3]
    b = [5,6,7]
    m = [
      [1,2,3],
      [5,6,7]
    ]

    my = [1,2,4,5,6,3]

    var collactableToReturn =  m.map((element, index) => {
        var test = element.filter((e, index) => {
          for (let index = 0; index < my.length; index++) {
            if (my[index] === e ) { 
              return true 
            }
          }
        })
        if (test.length === element.length) { 
          console.log('find a object')
          return true 
      } else { 
        return false
      }
    });

    console.log(collactableToReturn)

  }
 



  render() {
    return (
      <View style={{backgroundColor: "black" }}>
          <Collectables 
            array={[
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
            ]}
          />
      </View>
    );
  }
}
