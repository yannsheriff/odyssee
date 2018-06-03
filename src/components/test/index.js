import React from 'react'
import Svg,{ G, Rect, Image, Circle } from 'react-native-svg'
import screen from '../../helpers/ScreenSize'
import images, { backgrounds } from '../../assets/images'
import { AsyncStorage, View, Button } from 'react-native';
import { storeService } from '../../helpers/saveData'
import LottieView from 'lottie-react-native'
import Notification from '../Notification'
import { connect } from 'react-redux'


import { printNotification } from '../../redux/actions/notification'

import { microInteraction } from '../../assets/anim'

class BasicExample extends React.Component {
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
    this.state = {
      _callNotification: this.props.callnotification
    }
  }


  componentDidMount() {
    // this.restoreData()
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

  callnotification = () => {
    this.state._callNotification(
      "New notification",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porta nibh vitae nibh accumsan tincidunt.",
      require('../../assets/anim/success_animation.json')
    )
  }


 



  render() {
    return (
      <View style={{backgroundColor: "#FAFAFF", height: 800, width: 400, paddingTop: 100 }}>
          <Button 
            onPress={this.callnotification}
            title="press"
          />
          {/* <Notification /> */}
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
      callnotification: (title, sub, anim) => {
        dispatch(printNotification(title, sub, anim))
      },
    }
  }
  
  
  const componentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(BasicExample)
  
  export default componentContainer