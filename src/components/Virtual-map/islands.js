import React, { Component } from 'react';

import Svg,{
  Rect
} from 'react-native-svg';

export default class islands extends Component {
  constructor (props) {
    super(props)
    this.state = {
      islands: this.props.islands,
      deg: this.props.deg
    }
  }

  renderIslands () {
    const that = this
    return this.props.islands.map((c) => {
      return (
        <Rect
          key={ c.id }
          x={ c.position.x }
          y={ c.position.y }
          width={c.size}
          height={c.size}
          fill="#ffffff40"
          scale={1}
          rotation={-that.props.deg}
          originX={ c.position.x + (c.size / 2) }
          originY={ c.position.y + (c.size / 2) }
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