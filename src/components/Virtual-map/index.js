
//  Import modules
// --------------------------------------------------------------
import React, { Component } from 'react';
import { connect } from 'react-redux'
import Svg,{ G, Rect, Image, Text } from 'react-native-svg'


//  Import Helpers
// --------------------------------------------------------------
import images from '../../assets/images'
import screen from '../../helpers/ScreenSize'
import styles from './styles'

//  Import Constants
// --------------------------------------------------------------
import { mapSize, speedModifiers } from '../../constants'
import { IslandsData } from '../../constants/islands'

//  Import Components
// --------------------------------------------------------------
import Islands from './islands'

//  Import Actions
// --------------------------------------------------------------
import { launchMap, toggleSailing, updateOrientation, updatePosition } from '../../redux/actions/sailing'



class VirtualMap extends Component {

  constructor(props) {
    super(props)

    const center = {
      x: ((mapSize.x / 2) - (screen.width / 2)) * -1,
      y: ((mapSize.y / 2) - (screen.height / 2)) * -1
    }
    const vpRadius = Math.hypot(screen.width, screen.height) / 2

    this.state = {
      _launchMap: this.props.launchMap,
      _toggleSailing: this.props.toggleSailing,
      _updateOrientation: this.props.updateOrientation,
      _updatePosition: this.props.updatePosition,
      orientation: this.props.sailing.orientation,
      center: center,
      cnv: {
        x: this.props.sailing.position.x,
        y: this.props.sailing.position.y
      },
      sailing: false,
      vpRadius:  vpRadius,
      speedRadius: this._getSpeed(0),
      currentSpeed: 0,
      goalSpeed: 0,
      deceleration: 0,
      collisionPoint: {
        x: 0,
        y: 0
      },
      isCollided: false,
      contentToRender: []
    }
  }

  componentWillMount () {
    this._checkIfInViewport()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.sailing.orientation !== this.state.orientation) {
      const speed = this._getSpeed(nextProps.sailing.orientation)
      this.setState({
        orientation: nextProps.sailing.orientation,
        speedRadius: speed
      })
      this._sortContent()
    }
    if (nextProps.sailing.isSailing !== this.state.sailing) {
        this._toggleSailing()
        requestAnimationFrame(() => {this._updateMap()})
    }
    if (nextProps.sailing.callMap) {
        this.setState({
            currentSpeed: 0
        }, this.state._launchMap(this.state.cnv))
    }

  }

  _getSpeed (boatDir) {
    const dif = Math.abs(speedModifiers.direction - boatDir)
    const modifier = Math.abs((dif - 180) / 180)
    return speedModifiers.wind - (speedModifiers.wind * modifier) + speedModifiers.min
  }

  _toggleSailing () {
    if (this.state.sailing) {
      this.setState({
        sailing: !this.state.sailing,
        goalSpeed: 0,
        deceleration: this.state.currentSpeed / 30 // 30 is the number of frames needed for complete deceleration
      })
    } else {
      if (this.state.isCollided) {
        this._turnAround()
      }
      this.setState({
        sailing: !this.state.sailing,
        currentSpeed: speedModifiers.acceleration,
        goalSpeed: this.state.speedRadius
      })
    }
  }

  _turnAround () {
    console.log('repositionning')
    let turnAround = this.state.orientation + 180
    if (turnAround > 359) { turnAround +=  -360 }
    this.setState({
      isCollided: false,
      cnv: {
        x: this.state.collisionPoint.x,
        y: this.state.collisionPoint.y
      }
    })
    this.state._updateOrientation(turnAround)
  }

  /*
   * Check which elements should be rendered, and which are getting in collision distances
   */
  _checkIfInViewport () {
    this.state.contentTorender = []
    let content = []
    let collisionPoint = ''
    const cnv = this.state.cnv
    const currentCenterX = -(cnv.x + this.state.center.x) + (screen.width / 2)
    const currentCenterY = -(cnv.y + this.state.center.y) + (screen.height / 2)

    IslandsData.forEach((island) => {
      const dist = Math.hypot(currentCenterX - island.position.x, currentCenterY - island.position.y)
      if (dist <= this.state.vpRadius + 150) { // 150 is a margin so that bigger images get rendered even when their anchor point is still out of radius distance
        content.push(island)

        // check for collision
        if (island.isIsland) {
          if (dist <= (island.collisionDist + 100) && dist > (island.collisionDist + 10) && !this.state.isCollided) {
            collisionPoint = {
              x: this.state.cnv.x,
              y: this.state.cnv.y
            }
          } else if (dist <= island.collisionDist && !this.state.isCollided) {
            this.setState({
              isCollided: true
            })
            this.state._toggleSailing()
          }
        } else {
          if (dist <= island.collisionDist && island.opacity > 0) {
            island.opacity = island.opacity - 0.1
          } else if (dist >= island.collisionDist && island.opacity < 1) {
            island.opacity = island.opacity + 0.1
          }
        }
      }
    })
    this.state.contentToRender = content

    if ((collisionPoint.x !== this.state.collisionPoint.x && collisionPoint.y !== this.state.collisionPoint.y) && collisionPoint !== '') {
      this.setState({
        collisionPoint: collisionPoint
      })
    }
  }

  /*
   * Sort array of elements to render in order to prevent wrong index overlap
   */
  _sortContent () {
    this.state.contentToRender.sort((a, b) => {
      const o = this.state.orientation
      if (o < 45 || o >= 315) {
        return a.position.y - b.position.y
      } else if (o >= 45 && o < 135) {
        return a.position.x - b.position.x
      } else if (o >= 135 && o < 225) {
        return b.position.y - a.position.y
      } else if (o >= 225 && o < 315) {
        return b.position.x - a.position.x
      }
    })
  }

  _manageSpeed () {
    const dif = this.state.goalSpeed - this.state.currentSpeed
    if (dif > 0 && dif >= speedModifiers.acceleration) {
      // current speed is lower than goal speed : raise speed
      this.setState({ currentSpeed: this.state.currentSpeed + speedModifiers.acceleration })
    } else if (dif < 0 && dif <= -speedModifiers.acceleration) {
      // current speed is higher than goal speed : reduce speed
      if(this.state.sailing) {
        // updating speed after boat direction change
        this.setState({ currentSpeed: this.state.currentSpeed - speedModifiers.acceleration })
      } else {
        // stopping boat
        this.setState({ currentSpeed: this.state.currentSpeed - this.state.deceleration })
      }
    } else if (Math.abs(dif) < speedModifiers.acceleration) {
      // difference between goal and current speeds is inferior to the acceleration value : go directly to goal speed
      this.setState({ currentSpeed: this.state.goalSpeed })
    }
  }

  _updateMap () {
    if (this.state.currentSpeed > 0) {
      const s = this.state

      this._checkIfInViewport()
      this._sortContent()
      if (this.state.currentSpeed !== this.state.goalSpeed) {
        this._manageSpeed()
      }
      let newX = s.cnv.x + (s.currentSpeed) * Math.sin(s.orientation * 0.0174533)
      let newY = s.cnv.y + (s.currentSpeed) * Math.cos(s.orientation * 0.0174533)

      if (newX > (mapSize.x / 2) || newX < -(mapSize.x / 2) || newY > (mapSize.y / 2) || newY < -(mapSize.y / 2)) {
        newX = newX * -1
        newY = newY * -1
      }

      this.setState({
        cnv: {
          x: newX,
          y: newY
        }
      })
      this.state._updatePosition({x: newX, y: newY})

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
            fill="#59beb2"
          />
          <G
            width={mapSize.x}
            height={mapSize.y}
            x={this.state.cnv.x}
            y={this.state.cnv.y}
            scale={1}
          >
            <Islands
              islands={this.state.contentToRender}
              deg={this.state.orientation}
              images={images}
            />
          </G>
        </G>
        <Image
          x={(screen.width / 2) - 37.5}
          y={-(screen.height / 2) + 71.2125}
          width="75"
          height="142.425"
          preserveAspectRatio="xMidYMid slice"
          opacity="1"
          href={images.bateau}
        />
      </Svg>
    )
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

const mapDispatchToProps = dispatch => {
  return {
    launchMap: (position) => {
      dispatch(launchMap(position))
    },
    toggleSailing: () => {
      dispatch(toggleSailing())
    },
    updateOrientation: (orientation) => {
      dispatch(updateOrientation(orientation))
    },
    updatePosition: (position) => {
      dispatch(updatePosition(position))
    }
  }
}

const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(VirtualMap)

export default componentContainer