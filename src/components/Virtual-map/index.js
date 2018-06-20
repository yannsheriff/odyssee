
//  Import modules
// --------------------------------------------------------------
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Image, TouchableWithoutFeedback, Animated } from 'react-native'
import Svg,{ G, Rect, Defs, RadialGradient, Stop, Circle } from 'react-native-svg'
import RNSimpleCompass from 'react-native-simple-compass'
import LottieView from 'lottie-react-native'
import ReactNativeHaptic from 'react-native-haptic'

//  Import Helpers
// --------------------------------------------------------------
import images, { benediction } from '../../assets/images'
import screen from '../../helpers/ScreenSize'
import styles from './styles'
import renderIf from '../../helpers/renderIf'

//  Import Constants
// --------------------------------------------------------------
import { mapSize, speedModifiers, boatStates, windStates, seagullsStates } from '../../constants'
import { IslandsData } from '../../constants/islands'
import { animatedBoat, animatedWind, animatedSeagulls } from '../../assets/anim/index'
import collectables from '../../data/collectables.json'

//  Import Components
// --------------------------------------------------------------
import Islands from './islands'
import MultiActionButton from '../../components/Multi-action-button'

//  Import Actions
// --------------------------------------------------------------
import { collision, updatePosition, updateModifiers } from '../../redux/actions/sailing'
import { toggleMenu } from '../../redux/actions/menu'



class VirtualMap extends Component {

  constructor(props) {
    super(props)

    this.isGoingToIsland = false

    this.state = {
      _updateModifiers: this.props.updateModifiers,
      _updatePosition: this.props.updatePosition,
      _collision: this.props.collision,
      _toggleMenu: this.props.toggleMenu,
      // sailing
      orientation: 0,
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
      currentSpeed: 0,
      stopping: false,
      speedCap: {
        min: 0,
        max: 0.00001
      },
      goalSpeed: 0,
      deceleration: 0,
      collisionPoint: {
        x: 0,
        y: 0
      },
      islandCollided: null,
      contentToRender: [],
      // gradients
      biomeGradients: null,
      gradParams: {
        radius: 4000,
      },
      // speed modifiers
      windDirection: speedModifiers.direction,
      windStrength: speedModifiers.wind,
      activeGlyph: null,
      // compass
      hideUI: false,
      isCompassLocked: true,
      compassSensitivity: 1,
      destination: {
        id: '',
        x: '',
        y: ''
      },
      // boat animation
      animProgress: new Animated.Value(0),
      animData: animatedBoat,
      animStates: boatStates,
      animCurrent: 'stopped',
      animInLine: null,
      animGoal: null,
      animatingBoat: false,
      totalFrames: 270,
      // boat button
      glyphList: collectables.glyphs,
      equippedGlyphs: this.props.sailing.collectableEquipped,
      actionsForButton: [],
      haveAction: false,
      // wind animation
      windProgress: new Animated.Value(0),
      windData: animatedWind,
      windStates: windStates,
      totalWindFrames: 151,
      // seagulls animation
      seagullsProgress: new Animated.Value(0),
      seagullsData: animatedSeagulls,
      seagullsStates: seagullsStates,
      totalSeagullsFrames : 208
    }
  }

  componentWillMount () {
    this._checkIfInViewport()
    this._toggleCompassLock()
    if (this.state.biomeGradients === null) {
      this._getBiomeGradients()
    }
    if(this.state.equippedGlyphs.length > 0) {
      this.setState({
        haveAction: true
      }, this._getEquippedGlyphs())
    }
    if (this.props.sailing.destination.id !== this.state.destination.id && this.state.destination.id === '') {
      this.setState({
        destination: {
          id: this.props.sailing.destination.id,
          x: this.props.sailing.destination.x - (mapSize.x / 2),
          y: this.props.sailing.destination.y - (mapSize.y / 2)
        }
      })
    }
  }

  componentDidMount () {
    this.setState({
      speedRadius: this._getSpeed(0)
    })
    this._animateWind()
    setTimeout(() => {
      this._animateSeagulls()
    }, (Math.random() * 5000) + 3000)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.sailing.islandCollided === null && this.state.hideUI) {
      this.setState({
        hideUI: false
      })
    }
    if (nextProps.sailing.destination.id !== this.state.destination.id) {
      this.setState({
        destination: {
          id: nextProps.sailing.destination.id,
          x: nextProps.sailing.destination.x - (mapSize.x / 2),
          y: nextProps.sailing.destination.y - (mapSize.y / 2)
        }
      })
    }
    if (this.state.equippedGlyphs !== nextProps.sailing.collectableEquipped) {
      let haveAction = false
      if (nextProps.sailing.collectableEquipped.length > 0) { haveAction = true }
      this.setState({
        equippedGlyphs: nextProps.sailing.collectableEquipped,
        haveAction: haveAction
      }, this._getEquippedGlyphs)
    }
  }

  /*
   * Check which glyphs are equipped
   */
  _getEquippedGlyphs = () => {
    let buttons = []
    this.state.equippedGlyphs.forEach(glyph => {
      const equipped = this.state.glyphList.find(g => {
        return g.id === glyph
      })
      const asset = benediction.find(b => {
        return glyph === b.id
      })
      buttons.push(
        {
          id: equipped.id,
          img: asset.img,
          label: ''
        }
      )
    })
    this.setState({
      actionsForButton: buttons
    })
  }

  /*
   * actions when glyph is used
   */
  _useGlyph = (glyphId) => {
    const asset = benediction.find(b => {
      return glyphId === b.id
    })
    if (glyphId === 2) { // perfect wind direction glyph
      let wd = this.state.orientation + 180
      if (wd > 359) {wd = wd - 360}
      else if (wd < 0) {wd = wd + 360}
      this.setState({
        windDirection: wd,
        activeGlyph: asset.img
      })
      this.state._updateModifiers({
        strength: this.state.windStrength,
        direction: Math.round(wd)
      })
    }
    else {
      this.setState({
        activeGlyph: asset.img
      })
    }
  }

  /*
   * Start lottie animations & loop/change them depending on queue
   */
  _updateBoatAnimationState = () => {
    if (this.state.animCurrent) {
      const boatState = this.state.animStates[this.state.animCurrent]

      if (boatState.hasOwnProperty('cap') && this.state.speedCap !== boatState.cap) {
        this.setState({
          speedCap: {
            min: boatState.cap.min * (speedModifiers.max + speedModifiers.min),
            max: boatState.cap.max * (speedModifiers.max + speedModifiers.min)
          }
        })
      }

      this.state.animProgress.setValue(boatState.frames[0] / this.state.totalFrames)

      Animated.timing(this.state.animProgress, {
        toValue: boatState.frames[1] / this.state.totalFrames,
        duration: Math.abs(boatState.frames[0] - boatState.frames[1]) / 30 * 1000
      }).start(() => {
        if (this.state.animCurrent === 'stopped' && this.state.currentSpeed === 0 && this.state.animGoal === null) {
          this.setState({
            animatingBoat: false
          })
        }
        else {
          if (this.state.animGoal !== null) {
            this._switchBoatAnimation()
          } else if (this.state.animGoal === null && this.state.animCurrent === 'stopped' && this.state.currentSpeed > 0) {
            this.state.currentSpeed = 0
          }
          this._updateBoatAnimationState()
        }
      })
    } else {
      this.setState({
        animCurrent: 'stopped',
        animGoal: null,
        animInLine: null,
        goalSpeed: 0,
        currentSpeed: 0,
        sailing: false
      }, console.log('animCurrent fucked up again, resetting animations : ', this.state))
    }
  }

  /*
   * Calculate and return speed depending on wind strength & orientation
   */
  _getSpeed = (boatDir) => {
    const dif = Math.abs(this.state.windDirection - boatDir)
    const modifier = Math.abs((dif - 180) / 180)
    return this.state.windStrength - (this.state.windStrength * modifier) + speedModifiers.min
  }

  /*
   * Start/Stop boat movement
   */
  _toggleSailing = () => {
    if (this.state.sailing) {
      this.setState({
        sailing: !this.state.sailing,
        goalSpeed: 0,
        deceleration: this.state.currentSpeed / 40, // 35 is the number of frames needed for complete deceleration
        animInLine: this.state.animStates[this.state.animCurrent].stop,
        animGoal: 'stopped'
      })
    } else {
      if (this.state.currentSpeed === 0) {
        this.setState({
          sailing: !this.state.sailing,
          currentSpeed: speedModifiers.acceleration,
          goalSpeed: this.state.speedRadius
        }, this._updateMap )
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
                islandCollided: island.id,
                hideUI: true
              })
              this.state._collision(island.id)
              this._toggleSailing()
              if (!this.state.isCompassLocked) {
                this._toggleCompassLock()
              }
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

  /*
   * Manage offset/frame depending on the difference between goal and current speed
   */
  _manageSpeed = () => {
    const speed = this.state.currentSpeed
    const dif = this.state.goalSpeed - speed
    const maxSpeed = speedModifiers.max + speedModifiers.min

    if (dif > 0 && dif >= speedModifiers.acceleration) {
      // current speed is lower than goal speed : raise speed
      if (speed < this.state.speedCap.max) {
        this.setState({currentSpeed: this.state.currentSpeed + speedModifiers.acceleration})
      } else {
        this._checkBoatStateChanges('up')
      }
    }
    else if (dif < 0 && dif <= -speedModifiers.acceleration) {
      // current speed is higher than goal speed : reduce speed
      if(this.state.sailing) {
        // updating speed after boat direction change
        if (speed > this.state.speedCap.min) {
          this.setState({currentSpeed: this.state.currentSpeed - speedModifiers.acceleration})
        } else {
          this._checkBoatStateChanges('down')
        }
      }
      else {
        // stopping boat
        if (this.state.animCurrent === 'toStopped' || this.state.animCurrent === 'toRowing' || this.state.animCurrent === 'stopped') {
          this.setState({currentSpeed: this.state.currentSpeed - this.state.deceleration})
        } else {
          this._checkBoatStateChanges(false)
        }
      }
    }
    else if (Math.abs(dif) <= speedModifiers.acceleration) {
      // difference between goal and current speeds is inferior to the acceleration value : go directly to goal speed
      this.setState({ currentSpeed: this.state.goalSpeed })
    }
  }

  /*
   * Initiate new set of animations
   */
  _checkBoatStateChanges = (dir) => {
    const state = this.state

    if (state.animGoal === null && !this.state.stopping) {
      let inLine = null
      let goal = null
      let stop = false

      if (dir) {
        inLine = state.animStates[state.animCurrent][dir].trans
        goal = state.animStates[state.animCurrent][dir].goal
      }
      else if (!dir) {
        inLine = state.animStates[state.animCurrent].stop
        goal = 'stopped'
        stop = true
      }

      this.setState({
        animInLine: inLine,
        animGoal: goal,
        stopping: stop
      })
    }
  }

  /*
   * Switch animations that are in Line
   */
  _switchBoatAnimation = () => {
    let anims = ''
    let cap = this.state.speedCap
    if (this.state.animInLine !== this.state.animGoal) {
      const newCurrent = this.state.animInLine
      const newInLine = this.state.animGoal
      const newGoal = this.state.animGoal
      anims = {
        animCurrent: newCurrent,
        animInLine: newInLine,
        animGoal: newGoal
      }
      cap = {
        min: this.state.animStates[this.state.animCurrent].cap.min,
        max: this.state.animStates[this.state.animCurrent].cap.max
      }
    }
    else if (this.state.animInLine === this.state.animGoal) {
      const newCurrent = this.state.animInLine
      anims = {
        animCurrent: newCurrent,
        animInLine: null,
        animGoal: null
      }
    }
    if (typeof anims === 'object') {
      this.setState({
        animCurrent: anims.animCurrent,
        animInLine: anims.animInLine,
        animGoal: anims.animGoal,
        speedCap: cap
      })
    }
  }

  /*
   * Update map position every frame
   */
  _updateMap = () => {
    if (this.state.currentSpeed > 0) {
      const s = this.state
      let animBoat = this.state.animatingBoat

      if (!this.state.animatingBoat) {
        this._updateBoatAnimationState()
        animBoat = true
      }

      this._checkIfInViewport()
      this._sortContent()

      if (this.state.currentSpeed !== this.state.goalSpeed) {
        this._manageSpeed()
      }
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
        },
        animatingBoat: animBoat
      })

      requestAnimationFrame(() => {this._updateMap()})
    } else if (this.state.stopping) {
      this.setState({
        stopping: false
      })
    }
  }

  /*
  * Toggle the direction detection
  */
  _toggleCompassLock = () => {
    if (this.state.isCompassLocked) {
      this.setState({isCompassLocked: false})
      RNSimpleCompass.start(this.state.compassSensitivity, (degree) => {
        if (Math.abs(this.state.orientation - 360 - degree) >= 1) {
          this.setState({
            orientation: 360 - degree,
            speedRadius: this._getSpeed(360 - degree),
            goalSpeed: this._getSpeed(360 - degree)
          })
        }
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
        if (Math.abs(newOrientation - this.state.orientation) >= 1) {
          if (newOrientation > 359) {
            newOrientation = 0
          } else if (newOrientation < 0) {
            newOrientation = 359
          }
          const newSpeed = this._getSpeed(newOrientation)
          this.setState({
            orientation: newOrientation,
            speedRadius: newSpeed,
            goalSpeed: newSpeed
          })
          this._sortContent()
          this.touchLastPos = evt.nativeEvent.pageX
        }
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
      const adj = -position.y - destination.y
      const opp = -position.x - destination.x
      let dir
      if (adj > 0) {
        dir = Math.atan(opp / adj) * 180 / Math.PI
      } else if (adj < 0){
        dir = (Math.atan(opp / adj) * 180 / Math.PI) + 180
      }
      return dir
    }
  }

  /*
   * Update pointer opacity depending on direction
   */
  _getPointerOpacity = () => {
    const o = Math.abs(-this._getPointerDirection() + this.state.orientation - 180)
    if (!this.isGoingToIsland && o >= 170) {
      this.isGoingToIsland = true
      ReactNativeHaptic.generate('impact')
    }
    else if (this.isGoingToIsland && o < 170) {
      this.isGoingToIsland = false
    }
    return o / 180 * 0.8
  }

  /*
   * Get gradients for all islands and populate a static array
   */
  _getBiomeGradients = () => {
    let grads = []
    IslandsData.forEach(island => {
      if (island.isIsland) {
        grads.push({
          id: 'grad_' + island.id,
          position: island.position,
          grad: island.grad
        })
      }
    })
    this.setState({
      biomeGradients: grads
    })
  }

  /*
   * Make biome gradients (they should always be displayed so are rendered separatly from islands and other assets)
   */
  _createBiomeGradients = () => {
    return this.state.biomeGradients.map(grad => {
      return (
        <RadialGradient
          key={ grad.id }
          id={ grad.id }
          cx={ grad.position.x }
          cy={ grad.position.y }
          rx={ this.state.gradParams.radius }
          ry={ this.state.gradParams.radius }
          fx={ grad.position.x }
          fy={ grad.position.y }
          gradientUnits="userSpaceOnUse"
        >
          <Stop
            offset="0"
            stopColor={ grad.grad }
            stopOpacity="1"
          />
          <Stop
            offset="1"
            stopColor={ grad.grad }
            stopOpacity="0"
          />
        </RadialGradient>
      )
    })
  }

  /*
   * Insert gradients in circles
   */
  _renderBiomeGradients = () => {
    return this.state.biomeGradients.map(grad => {
      return (
        <Circle
          key={ grad.id }
          fill={ 'url(#' + grad.id + ')' }
          cx={ grad.position.x }
          cy={ grad.position.y }
          r={ this.state.gradParams.radius }
        />
      )
    })
  }

  /*
   * wind animation
   */
  _animateWind = () => {
    let w = Math.ceil(Math.random() * 3) - 1
    if (w < 0) { w = 0}

    this.state.windProgress.setValue(this.state.windStates[w][0] / this.state.totalWindFrames)

    Animated.timing(this.state.windProgress, {
      toValue: this.state.windStates[w][1] / this.state.totalWindFrames,
      duration: Math.abs(this.state.windStates[w][0] - this.state.windStates[w][1]) / 30 * 1000
    }).start(() => {
      setTimeout(() => {
        this._animateWind()
      }, (Math.random() * 3000) + 4000)
    })
  }

  /*
   * wind animation
   */
  _animateSeagulls = () => {
    let w = Math.ceil(Math.random() * 4) - 1
    if (w < 0) { w = 0}

    this.state.seagullsProgress.setValue(this.state.seagullsStates[w][0] / this.state.totalSeagullsFrames)

    Animated.timing(this.state.seagullsProgress, {
      toValue: this.state.seagullsStates[w][1] / this.state.totalSeagullsFrames,
      duration: Math.abs(this.state.seagullsStates[w][0] - this.state.seagullsStates[w][1]) / 30 * 1000
    }).start(() => {
      setTimeout(() => {
        this._animateSeagulls()
      }, (Math.random() * 10000) + 10000)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Svg
          height={screen.height}
          width={screen.width}
        >
          <Defs>
            {this._createBiomeGradients()}
          </Defs>
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
              fill="#4580F6"
            />
            <G
              width={mapSize.x}
              height={mapSize.y}
              x={this.state.position.x}
              y={this.state.position.y}
              scale={1}
            >
              {this._renderBiomeGradients()}
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
            source={ this.state.animData }
            progress={ this.state.animProgress }
          />
        </Animated.View>
        <Animated.View style={styles.seagulls}>
          <LottieView
            source={ this.state.seagullsData }
            progress={ this.state.seagullsProgress }
          />
        </Animated.View>
        <Animated.View style={[styles.windAnim, {transform: [{ rotate: 180 - this.state.windDirection + this.state.orientation + 'deg' }]} ]}>
          <LottieView
            source={ this.state.windData }
            progress={ this.state.windProgress }
          />
        </Animated.View>
        {renderIf(this.state.activeGlyph !== null && !this.state.hideUI,
          <View
            style={ styles.activeGlyph }
          >
            <Image
              source={ this.state.activeGlyph }
              style={ styles.glyph }
            />
          </View>
        )}
        {renderIf(this.state.haveAction,
        <MultiActionButton
          actions={this.state.actionsForButton}
          mainButtonsSize={ 120 }
          initalPositon={{ x: (screen.width / 2) - 60, y: (screen.height / 2) - 60 }}
          isActive={this.state.haveAction}
          onChoiceSelected={(action) => {
            this._useGlyph(action)
          }}
        />
        )}
        {renderIf(!this.state.hideUI,
          <View
            style={[styles.outerCompassContainer, { transform: [{ rotate: this.state.destination.id !== '' ? (-this._getPointerDirection() + this.state.orientation + 'deg') : 180 + 'deg' }] }]}
          >
            <Image
              style={[styles.pointer, { opacity: this._getPointerOpacity() + 0.2}]}
              source={images.boussole}
              resizeMethod="scale"
            />
          </View>
        )}
        {renderIf(!this.state.hideUI,
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
        )}
        {renderIf(!this.state.hideUI,
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
        )}
        {renderIf(!this.state.hideUI,
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
        )}
        <TouchableWithoutFeedback
          onPress={() => {
            this.state._updatePosition(this.state.position)
            this.state._updateModifiers({strength: this.state.windStrength, direction: this.state.windDirection})
            this.state._toggleMenu(0)
            if (!this.state.isCompassLocked) {
              this._toggleCompassLock()
            }
          }}
        >
          <View
            style={[styles.icon, styles.iconTop]}
          >
            <Image
              style={styles.iconBurger}
              source={images.burger}
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
    collision: (islandCollided) => {
      dispatch(collision(islandCollided))
    },
    updatePosition: (position) => {
      dispatch(updatePosition(position))
    },
    updateModifiers: (modifiers) => {
      dispatch(updateModifiers(modifiers))
    },
    toggleMenu: (page) => {
      dispatch(toggleMenu(page));
    }
  }
}

const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(VirtualMap)

export default componentContainer