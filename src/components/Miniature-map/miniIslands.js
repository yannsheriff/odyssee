import React, { Component } from 'react'

import Svg, { Circle } from 'react-native-svg'

//  Import Helpers
// --------------------------------------------------------------
import images from '../../assets/images'
import screen from '../../helpers/ScreenSize'

//  Import Constants
// --------------------------------------------------------------
import { mapSize } from '../../constants'
import { IslandsData } from '../../constants/islands'

export default class miniIslands extends Component {
  constructor (props) {
    super(props)
    this.state = {
      islands: IslandsData
    }
  }

  renderIslands () {
    return IslandsData.map((c) => {
      return (
        <Circle
          key={ c.id }
          fill="#ffffff40"
          scale={1}
          originX={c.size / 2}
          originY={c.size / 2}
          cx={(mapSize.x - c.position.x) / mapSize.x * screen.width}
          cy={(mapSize.y - c.position.y) / mapSize.y * screen.height}
          r="5"
        />
      )
    })
  }

  render(){
    return(
      this.renderIslands()
    )
  }
}
