//  Import modules
// --------------------------------------------------------------
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import Svg,{ Circle, G, Image, Line } from 'react-native-svg'


//  Import Helpers
// --------------------------------------------------------------
import images from '../../assets/images'
import screen from '../../helpers/ScreenSize'
import styles from './styles'

//  Import Constants
// --------------------------------------------------------------
import { mapSize, speedModifiers } from '../../constants'
import { IslandsData } from '../../constants/islands'

//  Import Actions
// --------------------------------------------------------------

import { hideMap, updateDestination } from  '../../redux/actions/sailing'


class MiniatureMap extends Component {

  constructor(props) {
    super(props)

    this.state = {
      _hideMap: this.props.hideMap,
      _updateDestination: this.props.updateDestination,
      position: this.props.sailing.position,
      destination: this.props.sailing.destination,
      menuHeight: 84,
      windUIHeight: 100,
      nbLines: 7
    }
  }

  _switchDestination (target) {
    if (target.id !== this.state.destination.id) {
      this.setState({
        destination: target
      })
      const destination = {
        id: target.id,
        x: target.position.x,
        y: target.position.y
      }
      this.state._updateDestination(destination)
    } else {
      this.setState({
        destination: ''
      })
      this.state._updateDestination('')
    }
  }

  _renderIslands = () => {
    return IslandsData.map((c) => {
      if (c.isIsland) {
        let color = '#ffffff60'
        let opacity = 0
        if (c.id === this.state.destination.id) {
          color = '#fbb70c'
          opacity = 1
        }
        return (
          <G>
            <Circle
              key={c.id}
              fill={ color }
              scale={1}
              cx={(mapSize.x - c.position.x) / mapSize.x * screen.width}
              cy={(mapSize.y - c.position.y) / mapSize.y * screen.height}
              r="8"
              onPress={() => { this._switchDestination(c) }}
            />
            <Circle
              key={ c.id }
              fill={ 'transparent' }
              strokeWidth={ 1 }
              stroke={ '#fbb70c' }
              scale={ 1 }
              cx={ (mapSize.x - c.position.x) / mapSize.x * screen.width }
              cy={ (mapSize.y - c.position.y) / mapSize.y * screen.height }
              r="12"
              opacity={ opacity }
            />
          </G>
        )
      }
    })
  }

  _createLines = () => {
    const lineSpace = screen.width / (this.state.nbLines + 1)
    const nbHorizontalLines = (screen.height - this.state.menuHeight - this.state.windUIHeight) / lineSpace
    let lines = []

    for (let i = 1; i <= this.state.nbLines; i++) {
      lines.push(
        <Line
          x1={ i * lineSpace }
          y1={ 0 }
          x2={ i * lineSpace }
          y2={ screen.height - this.state.menuHeight - this.state.windUIHeight}
          stroke='#ffffff40'
          strokeWidth="1"
        />
      )
    }
    for (let i = 0; i <= nbHorizontalLines; i++) {
      lines.push(
        <Line
          x1={ 0 }
          y1={ (lineSpace * i) + 1 }
          x2={ screen.width }
          y2={ (lineSpace * i) + 1 }
          stroke='#ffffff40'
          strokeWidth="1"
        />
      )
    }
    return lines
  }

  render() {
    return (
      <View>
        <Svg
          height={screen.height - this.state.menuHeight - this.state.windUIHeight}
          width={screen.width}
        >
          <G
            rotation={180}
            originX={screen.width / 2}
            originY={(screen.height - this.state.menuHeight - this.state.windUIHeight) / 2}
          >
            { this._createLines() }
            { this._renderIslands() }
            <Image
              x={ ((this.state.position.x + (mapSize.x / 2)) / mapSize.x * screen.width) - (126 / 4)}
              y={ -((this.state.position.y + (mapSize.y / 2)) / mapSize.y * screen.height) + (81 / 4)}
              width={ 126 / 2 }
              height={ 81 / 2 }
              opacity={ 1 }
              href={ images.iconBoat }
              preserveAspectRatio="xMidYMid slice"
              originX={((this.state.position.x + (mapSize.x / 2)) / mapSize.x * screen.width)}
              originY={((this.state.position.y + (mapSize.y / 2)) / mapSize.y * screen.height)}
              rotation={180}
            />
          </G>
        </Svg>
        <View
          style={ styles.infoContainer }
        >
          <Text
            style={ styles.windDirText }
          >
            { speedModifiers.direction + '°' }
          </Text>
          <Svg
            style={ styles.windDirIcon }
            width={ 80 }
            height={ 80 }
          >
            <Image
              x={ 5 }
              y={ -5 }
              width={ 70 }
              height={ 70 }
              href={ images.iconWind }
              preserveAspectRatio="xMidYMid slice"
            />
            <Circle
              fill={ '#ffffff' }
              cx={ 40 + (35 * Math.cos(90 - speedModifiers.direction * 0.0174533)) }
              cy={ 40 + (35 * Math.sin(90 - speedModifiers.direction * 0.0174533)) }
              r="5"
            />
          </Svg>
        </View>

      </View>
    )
  }
}

/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */


const mapStateToProps = state => {
  return {
    sailing: state.sailing
  }
}

const mapDispatchToProps = dispatch => {
  return {
    hideMap: () => {
      dispatch(hideMap())
    },
    updateDestination: (destination) => {
      dispatch(updateDestination(destination))
    }
  }
}

const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MiniatureMap)

export default componentContainer