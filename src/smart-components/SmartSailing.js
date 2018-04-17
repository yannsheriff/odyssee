//  Import Modules
// --------------------------------------------------------------
import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'

//  Import Helpers
// --------------------------------------------------------------
import renderIf from '../helpers/renderIf'

//  Import Components
// --------------------------------------------------------------
import VirtualMap from '../components/Virtual-map'
import Compass from '../components/Compass'
import MiniMap from '../components/Miniature-map'


class SmartSailing extends Component {


  constructor(props) {
    super(props)

    this.state = {
      isMapActive: this.props.sailing.isMapActive
    }
  }

  componentWillReceiveProps (nextProps) {
    if(nextProps.sailing.isMapActive !== this.state.isMapActive) {
      this.setState({ isMapActive: !this.state.isMapActive })
    }
  }


    render() {
        return (
            <View>
              {renderIf(!this.state.isMapActive,
                <VirtualMap />
              )}
              {renderIf(!this.state.isMapActive,
                <Compass />
              )}
              {renderIf(this.state.isMapActive,
                <MiniMap />
              )}
            </View>
        );
    }
}


const mapStateToProps = state => {
  return {
      sailing: state.sailing,
  }
}

const componentContainer = connect(
  mapStateToProps
)(SmartSailing)

export default componentContainer