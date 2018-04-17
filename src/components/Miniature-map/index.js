
//  Import modules
// --------------------------------------------------------------
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import Svg,{ G, Rect, Image, Circle } from 'react-native-svg'


//  Import Helpers
// --------------------------------------------------------------
import images from '../../assets/images'
import screen from '../../helpers/ScreenSize'
//import styles from './styles'

//  Import Constants
// --------------------------------------------------------------
import { mapSize, speedModifiers, circles } from '../../constants'

//  Import Actions
// --------------------------------------------------------------
import { hideMap } from  '../../actions/sailing'

class MiniatureMap extends Component {

  constructor(props) {
    super(props)

    this.state = {
      _hideMap: this.props.hideMap,
      position: {
        x: '',
        y: ''
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.sailing.orientation !== this.state.orientation) {
      const dif = Math.abs(speedModifiers.direction - nextProps.sailing.orientation)
      const modifier = Math.abs((dif - 180) / 180)
      const speed = speedModifiers.wind - (speedModifiers.wind * modifier) + speedModifiers.min
      this.setState({
        orientation: nextProps.sailing.orientation,
        speedRadius: speed
      })
    }
    if (nextProps.sailing.isSailing !== this.state.sailing) {
      this._toggleSailing()
      requestAnimationFrame(() => {this._updateMap()})
    }
  }


  _toggleSailing () {
    if (this.state.sailing) {
      this.setState({
        sailing: !this.state.sailing,
        goalSpeed: 0
      })
    } else {
      this.setState({
        sailing: !this.state.sailing,
        currentSpeed: speedModifiers.acceleration,
        goalSpeed: this.state.speedRadius
      })
    }
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

  /*  _renderAnim () {
      var current = this.state.anim.current + (this.state.anim.end - this.state.anim.current) * 0.1



      this.setState({ anim: {current:  current }});
    }*/

  _manageSpeed () {
    const dif = this.state.goalSpeed - this.state.currentSpeed
    if (dif > 0 && dif >= speedModifiers.acceleration) {
      this.setState({ currentSpeed: this.state.currentSpeed + speedModifiers.acceleration })
    } else if (dif < 0 && dif <= -speedModifiers.acceleration) {
      this.setState({ currentSpeed: this.state.currentSpeed - speedModifiers.acceleration })
    } else if ( Math.abs(dif) < speedModifiers.acceleration ) {
      this.setState({ currentSpeed: this.state.goalSpeed })
    }
  }

  _updateMap () {
    if (this.state.currentSpeed > 0) {
      const s = this.state

      this._checkIfInViewport()
      this._manageSpeed()

      let newX = s.cnv.x + (s.currentSpeed) * Math.sin(s.orientation * 0.0174533)
      let newY = s.cnv.y + (s.currentSpeed) * Math.cos(s.orientation * 0.0174533)

      console.log(newX - s.cnv.x, newY - s.cnv.y)

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

      requestAnimationFrame(() => {this._updateMap()})
    }
  }


  render() {
    return (
      <View>
        <Text style={{color: 'white'}} > Yo! </Text>
      </View>
    )
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
    hideMap: () => {
      dispatch(hideMap())
    }
  }
}

const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MiniatureMap)

export default componentContainer