//  Import Modules
// --------------------------------------------------------------
import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { requestStore } from '../redux/actions/loading'
import { AsyncStorage } from 'react-native';



//  Import Components
// --------------------------------------------------------------
import Router from '../Router'
import Notification from '../components/Notification'
import MainMenu from '../components/Main-menu'


class SmartLoading extends Component {


  constructor(props) {
    super(props)
    this.state = {
       ReduxState: this.props.state,
       populateStore: this.props.populateStore
    } 
  }

  componentWillMount() {
    AsyncStorage.removeItem('saved');
  }

  componentDidMount() {
    console.log(this.state.ReduxState)
    this.state.populateStore()
  }

  componentWillReceiveProps(nextProps) {
    // console.log("nextProps", nextProps)
    this.setState({
      ReduxState: nextProps.state
    }, ()=> console.log(this.state.ReduxState))
  }

    render() {
      let render = this.state.ReduxState.island !== undefined && this.state.ReduxState.sailing.isMapActive !== undefined
      ? ( <View><Router /><MainMenu /><Notification /></View> ) 
      : ( <View><Text>loading..</Text></View> /* <Loader /> */ )
        return render
    }
}


/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */
  
const mapStateToProps = state => {
  return {
      state: state
    }
}

const mapDispatchToProps = dispatch => {
    return {
      populateStore: () => {
        dispatch(requestStore())
      },
    }
  }

const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SmartLoading)

export default componentContainer