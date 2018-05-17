//  Import modules
// --------------------------------------------------------------
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import Svg,{ Rect, Circle, G, Text } from 'react-native-svg'


//  Import Helpers
// --------------------------------------------------------------
import images from '../../assets/images'
import screen from '../../helpers/ScreenSize'
import styles from './styles'

//  Import Constants
// --------------------------------------------------------------
import { mapSize } from '../../constants'
import { IslandsData } from '../../constants/islands'

//  Import Actions
// --------------------------------------------------------------
import { hideMap, updateDestination } from  '../../actions/sailing'

class MiniatureMap extends Component {

  constructor(props) {
    super(props)

    this.state = {
      _hideMap: this.props.hideMap,
      _updateDestination: this.props.updateDestination,
      position: this.props.sailing.position,
      destination: this.props.sailing.destination
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

  _renderIslands () {
    return IslandsData.map((c) => {
      if (c.isIsland) {
        let color = '#ffffff40'
        if (c.id === this.state.destination.id) {
          color = 'red'
        }
        return (
          <Circle
            key={c.id}
            fill={ color }
            scale={1}
            originX={c.size / 2}
            originY={c.size / 2}
            cx={(mapSize.x - c.position.x) / mapSize.x * screen.width}
            cy={(mapSize.y - c.position.y) / mapSize.y * screen.height}
            r="5"
            onPress={() => { this._switchDestination(c) }}
          />
        )
      }
    })
  }

  render() {
    return (
      <View>
        <Svg
          style={styles.svg}
          height={screen.height}
          width={screen.width}
        >
          <G
            rotation={180}
            originX={screen.width / 2}
            originY={screen.height / 2}
          >
            <Rect
              width={screen.width}
              height={screen.height}
              x={0}
              y={0}
              scale={1}
              fill="#0071e9"
              onPress={this.state._hideMap}
            />
            { this._renderIslands() }
            <Circle
              cx={(this.state.position.x + (mapSize.x / 2)) / mapSize.x * screen.width}
              cy={(this.state.position.y + (mapSize.y / 2)) / mapSize.y * screen.height}
              r="2"
              fill="red"
            />
          </G>
        </Svg>
        <Text
          fill="black"
          fontSize="20"
          fontWeight="bold"
          x="100"
          y="70">
          {/*{ this.state.destination.position.id }*/}
        </Text>
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