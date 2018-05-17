//  Import Modules
// --------------------------------------------------------------
import React, { Component } from 'react'
import { View, AppState } from 'react-native'
import { connect } from 'react-redux'
import { saveSailing } from '../redux/actions/sailing'

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
      _saveSailing: this.props.saveSailing,
      isMapActive: this.props.sailing.isMapActive,
      reduxState: this.props.sailing,
      appState: AppState.currentState
    }
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange)
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange)
    this.state._saveSailing()
    console.log('unmount maboy')
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState === 'active' && nextAppState === 'background') {
      this.state._saveSailing(this.state.reduxState)
    }
  }

  componentWillReceiveProps (nextProps) {
    
    if(nextProps.sailing.isMapActive !== this.state.isMapActive) {

        var isMapActive = !this.state.isMapActive 
    } else {
      var isMapActive = this.state.isMapActive 
    }

    this.setState({ 
      reduxState: nextProps.sailing,
      isMapActive: isMapActive
    })
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
    saveSailing: (state) => {
      dispatch(saveSailing(state))
    }
  }
}

const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SmartSailing)

export default componentContainer