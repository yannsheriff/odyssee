//  Import Modules
// --------------------------------------------------------------
import React, { Component } from 'react'
import { View, AppState, Image } from 'react-native'
import { connect } from 'react-redux'
import { saveSailing, collision } from '../redux/actions/sailing'

//  Import Helpers
// --------------------------------------------------------------
import renderIf from '../helpers/renderIf'
import screen from '../helpers/ScreenSize'
import images from '../assets/images'

//  Import Components
// --------------------------------------------------------------
import VirtualMap from '../components/Virtual-map'
import MiniMap from '../components/Miniature-map'
import MultiActionButton from '../components/Multi-action-button'


class SmartSailing extends Component {

  constructor(props) {
    super(props)

    this.state = {
      _saveSailing: this.props.saveSailing,
      _collision: this.props.collision,
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
      console.log('savemaboy')
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
            id: 'leave',
            img: images.iconLeaveIsland,
            label: 'Rester en mer'
          },
          {
            id: nextProps.sailing.islandCollided,
            img: images.iconEnterIsland,
            label: 'Accoster sur l\'île'
          }
        ],
        haveAction: true
      })
    }
  }


  render() {
      return (
          <View
            style={{
              width: screen.width,
              height: screen.height,
              position: "absolute",
              top: 0,
              left: 0
            }}
          >
            <VirtualMap />
            {renderIf(this.state.islandCollided !== null,

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

                initalPositon={{ x: (screen.width / 2) - 25, y: screen.height - 100 }}

                isActive={this.state.haveAction}

                onChoiceSelected={(action) => {
                  if (action === 'leave') {
                    this.state._collision(null)
                  } else {
                    this.props.navigation.navigate('Island', { islandId: action })
                  }
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
    },
    collision: (islandCollided) => {
      dispatch(collision(islandCollided))
    }
  }
}

const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SmartSailing)

export default componentContainer