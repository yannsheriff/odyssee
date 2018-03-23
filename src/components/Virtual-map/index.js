
//  Import modules
// --------------------------------------------------------------
import React, { Component } from 'react';
import { connect } from 'react-redux'
import Svg,{ G, Rect, Image } from 'react-native-svg'


//  Import Helpers
// --------------------------------------------------------------
import images from '../../assets/images'
import screen from '../../helpers/ScreenSize'
import styles from './styles'

//  Import Constants
// --------------------------------------------------------------
import { mapSize, speedRadius, circles } from '../../constants'

//  Import Components
// --------------------------------------------------------------
import Circles from './Circles-provisoir'



class VirtualMap extends Component {

  constructor(props) {
    super(props)

    const center = {
      x: ((mapSize.x / 2) - (screen.width / 2)) * -1,
      y: ((mapSize.y / 2) - (screen.height / 2)) * -1
    }
    const vpRadius = Math.hypot(screen.width, screen.height) / 2

    this.state = {
      orientation: this.props.sailing.orientation,
      center: center,
      cnv: { x: 0, y: 0 },
      sailing: false,
      vpRadius:  vpRadius,
      contentToRender: []
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ orientation: nextProps.sailing.orientation })
    if (nextProps.sailing.isSailing != this.state.sailing) {
        this._toggleSailing()
        requestAnimationFrame(() => {this._updateMap()})
    }
  }

  _toggleSailing () {
    this.setState({
      sailing: !this.state.sailing
    })
  }

  _checkIfInViewport () {
    this.state.contentToRender = []
    const cnv = this.state.cnv
    const currentCenterX = -(cnv.x + this.state.center.x) + (screen.width / 2)
    const currentCenterY = -(cnv.y + this.state.center.y) + (screen.height / 2)

    circles.forEach((c) => {
      const dist = Math.hypot(currentCenterX - c.x, currentCenterY - c.y)
      if (dist <= this.state.vpRadius) {
        this.state.contentToRender.push(c)
      }
    })
  }

  _updateMap () {
    if (this.state.sailing) {
      const s = this.state

      this._checkIfInViewport()

      const newX = s.cnv.x + (speedRadius) * Math.sin(s.orientation * 0.0174533)
      const newY = s.cnv.y + (speedRadius) * Math.cos(s.orientation * 0.0174533)

      this.setState({
        cnv: {
          x: newX,
          y: newY
        }
      })
      requestAnimationFrame(() => {this._updateMap()})
    }
  }


  render() {
    return (
      <Svg
        height={screen.height}
        width={screen.width}
      >
        <G
          width={mapSize.x}
          height={mapSize.y}
          x={this.state.center.x}
          y={this.state.center.y}
          originX={mapSize.x / 2}
          originY={mapSize.y / 2}
          rotation={this.state.orientation}
          scale={1}
        >
          <Rect
            width={mapSize.x}
            height={mapSize.y}
            x={0}
            y={0}
            scale={1}
            fill="#0071e9"
          />
          <G
            width={mapSize.x}
            height={mapSize.y}
            x={this.state.cnv.x}
            y={this.state.cnv.y}
            scale={1}
          >
            <Circles
              circlesToRender={this.state.contentToRender}
              deg={this.state.orientation}
            />
          </G>
        </G>
        <Image
          x={(screen.width / 2) - 50}
          y={-(screen.height / 2) + 94.46}
          width="100"
          height="189.9"
          preserveAspectRatio="xMidYMid slice"
          opacity="1"
          href={images.bateau}
        />
      </Svg>
    );
  }
}


/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */ 

const mapStateToProps = state => {
  return {
    sailing: state.sailing,
  }
}

const componentContainer = connect(
  mapStateToProps
)(VirtualMap)

export default componentContainer