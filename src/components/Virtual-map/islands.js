import React, { Component } from 'react'

import Svg,{
  Text, G, Image
} from 'react-native-svg'

import images from '../../assets/images'

export default class islands extends Component {
  constructor (props) {
    super(props)
    this.state = {
      islands: this.props.islands,
      deg: this.props.deg
    }
  }

  renderIslands () {
    return this.props.islands.map((c) => {
      return (
        <Image
          key={ c.id }
          x={ c.position.x - (c.size.x / 2) }
          y={ -c.position.y + (c.size.y / 2) }
          width={ c.size.x }
          height={ c.size.y }
          href={ images.iles[c.image] }
          preserveAspectRatio="xMidYMid slice"
          rotation={-this.props.deg}
          originX={ c.position.x }
          originY={ c.position.y }
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
