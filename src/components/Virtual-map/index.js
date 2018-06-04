
//  Import modules
// --------------------------------------------------------------
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Image, TouchableWithoutFeedback, Animated } from 'react-native'
import Svg,{ G, Rect } from 'react-native-svg'
import RNSimpleCompass from 'react-native-simple-compass'
import LottieView from 'lottie-react-native'


//  Import Helpers
// --------------------------------------------------------------
import images from '../../assets/images'
import screen from '../../helpers/ScreenSize'
import styles from './styles'

//  Import Constants
// --------------------------------------------------------------
import { mapSize, speedModifiers, boatStates } from '../../constants'
import { IslandsData } from '../../constants/islands'
import { animatedBoat } from '../../assets/anim/index'

//  Import Components
// --------------------------------------------------------------
import Islands from './islands'

//  Import Actions
// --------------------------------------------------------------
import { launchMap, collision } from '../../redux/actions/sailing'



class VirtualMap extends Component {

  constructor(props) {
    super(props)

    this.state = {
      _launchMap: this.props.launchMap,
      _collision: this.props.collision,
      // sailing
      orientation: this.props.sailing.orientation,
      center: {
        x: ((mapSize.x / 2) - (screen.width / 2)) * -1,
        y: ((mapSize.y / 2) - (screen.height / 2)) * -1
      },
      position: {
        x: this.props.sailing.position.x,
        y: this.props.sailing.position.y
      },
      sailing: false,
      vpRadius:  Math.hypot(screen.width, screen.height) / 2,
      speedRadius: this._getSpeed(0),
      currentSpeed: 0,
      goalSpeed: 0,
      deceleration: 0,
      collisionPoint: {
        x: 0,
        y: 0
      },
      islandCollided: null,
      contentToRender: [],
      // compass
      isCompassLocked: true,
      compassSensitivity: 1,
      destination: {
        id: this.props.sailing.destination.id,
        x: this.props.sailing.destination.x - (mapSize.x / 2),
        y: this.props.sailing.destination.y - (mapSize.y / 2)
      },
      // boat animation
      animData: animatedBoat,
      animStates: boatStates,
      animCurrent: 'sailing',
      animInLine: [],
      animGoal: null,
      currentFrame: 0,
      nbFrames: 1
    }
  }

  componentWillMount () {
    this._checkIfInViewport()
    this._toggleCompassLock()
  }

  componentDidMount () {
    this._updateBoatAnimationState()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.sailing.callMap) {
        this.setState({
            currentSpeed: 0
        }, this.state._launchMap(this.state.position))
    }
  }

  _updateBoatAnimationState = () => {
    const boatState = this.state.animStates[this.state.animCurrent].frames
    this.setState({
      nbFrames: Math.abs(boatState[0] - boatState[1])
    })
    this.animation.play(boatState[0], boatState[1])
  }

  _getSpeed = (boatDir) => {
    const dif = Math.abs(speedModifiers.direction - boatDir)
    const modifier = Math.abs((dif - 180) / 180)
    return speedModifiers.wind - (speedModifiers.wind * modifier) + speedModifiers.min
  }

  _toggleSailing = () => {
    if (this.state.sailing) {
      this.setState({
        sailing: !this.state.sailing,
        goalSpeed: 0,
        deceleration: this.state.currentSpeed / 30 // 30 is the number of frames needed for complete deceleration
      })
    } else {
      this.setState({
        sailing: !this.state.sailing,
        currentSpeed: speedModifiers.acceleration,
        goalSpeed: this.state.speedRadius
      })
      if (this.state.currentSpeed === 0) {
        requestAnimationFrame(() => {this._updateMap()})
      }
    }
  }

  /*
   * Check which elements should be rendered, and which are getting in collision distances
   */
  _checkIfInViewport = () => {
    this.state.contentTorender = []
    let content = []
    const position = this.state.position
    const currentCenterX = -(position.x + this.state.center.x) + (screen.width / 2)
    const currentCenterY = -(position.y + this.state.center.y) + (screen.height / 2)

    IslandsData.forEach((island) => {
      const dist = Math.hypot(currentCenterX - island.position.x, currentCenterY - island.position.y)
      if (dist <= this.state.vpRadius + 150) { // 150 is a margin so that bigger images get rendered even when their anchor point is still out of radius distance

        // check for collision
        if (island.isIsland) {
          if (dist <= island.collisionDist) {
            if (this.state.islandCollided === null) {
              this.setState({
                islandCollided: island.id
              })
              this.state._collision(island.id)
              this._toggleSailing()
            } else if (this.state.islandCollided !== null && island.opacity > 0 && this.state.goalSpeed > 0) {
              island.opacity = Math.floor(((island.opacity * 10) - 1)) / 10
            }
          } else if (dist >= island.collisionDist + 100 && island.opacity < 1) {
            if (this.state.islandCollided !== null) {
              this.setState({
                islandCollided: null
              })
            }
            island.opacity = Math.floor(((island.opacity * 10) + 1)) / 10
          }
        } else if (!island.isIsland) {
          if (dist <= island.collisionDist && island.opacity > 0) {
            island.opacity += - 0.1
          } else if (dist >= island.collisionDist && island.opacity < 1) {
            island.opacity += 0.1
          }
        }
        // add island to array of elements to be rendered
        content.push(island)
      }
    })
    this.state.contentToRender = content
  }

  /*
   * Sort array of elements to render in order to prevent wrong index overlap
   */
  _sortContent = () => {
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

  _manageSpeed = () => {
    const speed = this.state.currentSpeed
    const dif = this.state.goalSpeed - speed
    const maxSpeed = speedModifiers.max + speedModifiers.min

    if (dif > 0 && dif >= speedModifiers.acceleration) {
      // current speed is lower than goal speed : raise speed
      this.setState({ currentSpeed: this.state.currentSpeed + speedModifiers.acceleration })
      this._checkBoatStateChanges('up')
    }
    else if (dif < 0 && dif <= -speedModifiers.acceleration) {
      // current speed is higher than goal speed : reduce speed
      if(this.state.sailing) {
        // updating speed after boat direction change
        this.setState({ currentSpeed: this.state.currentSpeed - speedModifiers.acceleration })
        this._checkBoatStateChanges('down')
      }
      else {
        // stopping boat
        this.setState({ currentSpeed: this.state.currentSpeed - this.state.deceleration })
        this._checkBoatStateChanges(false)
      }
    }
    else if (Math.abs(dif) < speedModifiers.acceleration) {
      // difference between goal and current speeds is inferior to the acceleration value : go directly to goal speed
      this.setState({ currentSpeed: this.state.goalSpeed })
    }
  }

  _checkBoatStateChanges = (dir) => {
    const state = this.state
    const speed = state.currentSpeed
    const maxSpeed = speedModifiers.max + speedModifiers.min

    if (state.animGoal !== null) {
      let inLine = null
      let goal = null

      if (dir) {
        inLine = state.animStates[state.animCurrent][dir].trans
        goal = state.animStates[state.animCurrent][dir].goal
      }
      else if (!dir) {
        inLine = state.animStates[state.animCurrent].stop
        goal = 'stopped'
      }

      this.setState({
        animInLine: inLine,
        animGoal: goal
      })
    }
  }

  _switchBoatAnimation = () => {
    const state = this.state
    let nextFrame = state.currentFrame + 1
    if (nextFrame > state.nbFrames) {
      nextFrame = 0
    }
    this.setState({
      currentFrame: nextFrame
    })
    console.log(this.state.currentFrame, this.state.nbFrames)
  }

  /*
   * Update map position every frame
   */
  _updateMap = () => {
    if (this.state.currentSpeed > 0) {
      const s = this.state

      this._checkIfInViewport()
      this._sortContent()
      if (this.state.currentSpeed !== this.state.goalSpeed) {
        this._manageSpeed()
      }
      //if (this.state.goal !== null) {
        this._switchBoatAnimation()
      //}
      let newX = s.position.x + (s.currentSpeed) * Math.sin(s.orientation * 0.0174533)
      let newY = s.position.y + (s.currentSpeed) * Math.cos(s.orientation * 0.0174533)

      if (newX > (mapSize.x / 2) || newX < -(mapSize.x / 2) || newY > (mapSize.y / 2) || newY < -(mapSize.y / 2)) {
        newX = newX * -1
        newY = newY * -1
      }

      this.setState({
        position: {
          x: newX,
          y: newY
        }
      })

      requestAnimationFrame(() => {this._updateMap()})
    }
  }

  /*
  * Toggle the direction detection
  */
  _toggleCompassLock = () => {
    if (this.state.isCompassLocked) {
      this.setState({isCompassLocked: false})
      RNSimpleCompass.start(this.state.compassSensitivity, (degree) => {
        this.setState({orientation: degree})
      });
    } else {
      this.setState({isCompassLocked: true})
      RNSimpleCompass.stop()
    }
  }

  /*
  * Handle the rotation of the compass on the drag event
  */
  _handleCompassDrag = (evt) => {
    if (this.state.isCompassLocked) {
      if (this.touchLastPos) {
        const diffBetweenLastAndNewPos = this.touchLastPos - evt.nativeEvent.pageX
        let newOrientation = this.state.orientation + diffBetweenLastAndNewPos / 4
        if (newOrientation > 359) {
          newOrientation = 0
        } else if (newOrientation < 0) {
          newOrientation = 359
        }
        const newSpeed = this._getSpeed(newOrientation)
        this.setState({
          orientation: newOrientation,
          speedRadius: newSpeed
        })
        this._sortContent()
        this.touchLastPos = evt.nativeEvent.pageX
      } else {
        this.touchLastPos = evt.nativeEvent.pageX
      }
    }
  }

  /*
   * Update pointer direction so it always points to selected island
   */
  _getPointerDirection = () => {
    if (this.state.destination.id !== '') {
      const position = this.state.position
      const destination = this.state.destination
      const adj = position.y - destination.y
      const opp = position.x - destination.x
      let dir
      if (adj > 0) {
        dir = Math.atan(opp / adj) * 180 / Math.PI
      } else if (adj < 0){
        dir = (Math.atan(opp / adj) * 180 / Math.PI) + 180
      }
      return dir
    }
  }

  render() {
    return (
      <View style={styles.container}>
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
              x={this.state.position.x}
              y={this.state.position.y}
              scale={1}
            >
              <Islands
                islands={this.state.contentToRender}
                deg={this.state.orientation}
                images={images}
              />
            </G>
          </G>
        </Svg>
        <Animated.View style={styles.boat}>
          <LottieView
            ref={ animation => {
              this.animation = animation
            }}
            loop={ true }
            speed={ 1 }
            source={ this.state.animData }
          />
        </Animated.View>
        <View
          style={[styles.outerCompassContainer, { transform: [{ rotate: this.state.destination.id !== '' ? (-this._getPointerDirection() + this.state.orientation + 'deg') : 180 + 'deg' }] }]}
        >
          <Image
            style={styles.pointer}
            source={images.boussole}
            resizeMethod="scale"
          />
        </View>
        <View
          onStartShouldSetResponder={(evt) => true}
          onMoveShouldSetResponder={(evt) => true}
          onResponderMove={this._handleCompassDrag}
          onResponderRelease={(evt) => { this.touchLastPos = undefined }}
          style={[styles.compassContainer, { transform: [{ rotate: -this.state.orientation + 'deg' }] }]}
        >
          <Image
            style={styles.compass}
            source={images.aiguille}
            resizeMethod="scale"
          />
        </View>
        <TouchableWithoutFeedback
          onPress={() => this._toggleSailing()}
        >
          <View
            style={[styles.icon, styles.iconLeft]}
          >
            <Image
              style={styles.iconImage}
              source={this.state.sailing ? images.iconPause : images.iconPlay}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={this._toggleCompassLock}
        >
          <View
            style={[styles.icon, styles.iconRight]}
          >
            <Image
              style={styles.iconImage}
              source={this.state.isCompassLocked ? images.iconLock : images.iconUnlock}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback

        >
          <View
            style={[styles.icon, styles.iconTop]}
          >
            <Image
              style={styles.iconImage}
              source={images.iconMap}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
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
    collision: (islandCollided) => {
      dispatch(collision(islandCollided))
    }
  }
}

const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(VirtualMap)

export default componentContainer