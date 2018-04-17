//  Import modules
// --------------------------------------------------------------
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Button } from 'react-native'
import Svg,{ Rect, Circle } from 'react-native-svg'


//  Import Helpers
// --------------------------------------------------------------
import images from '../../assets/images'
import screen from '../../helpers/ScreenSize'
import styles from './styles'

//  Import Constants
// --------------------------------------------------------------
import { mapSize } from '../../constants'

//  Import Actions
// --------------------------------------------------------------
import { hideMap } from  '../../actions/sailing'

class MiniatureMap extends Component {

  constructor(props) {
    super(props)

    this.state = {
      _hideMap: this.props.hideMap,
      position: this.props.sailing.position
    }
  }

  render() {
    return (
      <View>
        <Svg
          style={styles.svg}
          height={screen.height}
          width={screen.width}
        >
          <Rect
            width={screen.width}
            height={screen.height}
            x={0}
            y={0}
            scale={1}
            fill="#0071e9"
          />
          <Circle
            cx={(this.state.position.x + (mapSize.x / 2)) / mapSize.x * screen.width}
            cy={(this.state.position.y + (mapSize.y / 2)) / mapSize.y * screen.height}
            r="2"
            fill="red"
          />
        </Svg>
        <Button
          style={styles.button}
          onPress={this.state._hideMap}
          title={'map'}
          color="#fff"
        />
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
    }
  }
}

const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MiniatureMap)

export default componentContainer