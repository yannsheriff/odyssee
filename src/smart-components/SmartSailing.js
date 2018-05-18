//  Import Modules
// --------------------------------------------------------------
import React, { Component } from 'react'
import { View, AppState, Image } from 'react-native'
import { connect } from 'react-redux'
import { saveSailing } from '../redux/actions/sailing'

//  Import Helpers
// --------------------------------------------------------------
import renderIf from '../helpers/renderIf'
import images from '../assets/images'

//  Import Components
// --------------------------------------------------------------
import VirtualMap from '../components/Virtual-map'
import Compass from '../components/Compass'
import MiniMap from '../components/Miniature-map'
import MultiActionButton from '../components/Multi-action-button'


class SmartSailing extends Component {


  constructor(props) {
    super(props)

    this.state = {
      _saveSailing: this.props.saveSailing,
      isMapActive: this.props.sailing.isMapActive,
      islandCollided: this.props.sailing.islandCollided,
      reduxState: this.props.sailing,
      appState: AppState.currentState,
      actionsForButton: [],
      haveAction: false
    }
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange)
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange)
    this.state._saveSailing(this.state.reduxState)
    console.log('unmount maboy')
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState === 'active' && nextAppState === 'background') {
      this.state._saveSailing(this.state.reduxState)
    }
  }

  componentWillReceiveProps (nextProps) {
    if(nextProps.sailing.isMapActive !== this.state.isMapActive) {
      this.setState({
        reduxState: nextProps.sailing,
        isMapActive: !this.state.isMapActive,
      })
    } else if(nextProps.sailing.islandCollided !== this.state.islandCollided) {
      this.setState({
        reduxState: nextProps.sailing,
        islandCollided: nextProps.sailing.islandCollided,
        actionsForButton: [
          {
            id: nextProps.sailing.islandCollided,
            img: 1,
            label: 'Accoster sur l\'île'
          }
        ],
        haveAction: true
      })
    }
  }


  render() {
      return (
          <View>
            {renderIf(!this.state.isMapActive,
              <VirtualMap />
            )}
            {renderIf(!this.state.isMapActive && this.state.islandCollided === null,
              <Compass />
            )}
            {renderIf(this.state.isMapActive,
              <MiniMap />
            )}
            {renderIf(!this.state.isMapActive && this.state.isCollided !== null,
              <MultiActionButton
                actions={this.state.actionsForButton}

                mainButton={
                  <Image
                    source={images.openMenu}
                    resizeMethod={"contain"}
                    style={{height: 50, width: 50}}
                  />
                }

                mainBtnOpen={
                  <Image
                    source={images.closeMenu}
                    resizeMethod={"contain"}
                    style={{height: 50, width: 50}}
                  />
                }

                disabled={
                  <Image
                    source={images.openMenu}
                    resizeMethod={"contain"}
                    style={{height: 50, width: 50, opacity: 0.1}}
                  />
                }

                isActive={this.state.haveAction}

                onChoiceSelected={(action) => {
                  console.log(action)
                }}
              />
            )}
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