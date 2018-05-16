//  Import Modules
// --------------------------------------------------------------
import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { requestStore } from '../redux/actions/loading'


//  Import Components
// --------------------------------------------------------------
import Router from '../Router'


class SmartLoading extends Component {


  constructor(props) {
    super(props)
    this.state = {
       ReduxState: this.props.state,
       populateStore: this.props.populateStore
    } 
  }

  componentDidMount() {
    console.log(this.state.ReduxState)
    this.state.populateStore()
  }

  componentWillReceiveProps(nextProps) {
    // console.log("nextProps", nextProps)
    this.setState({
      ReduxState: nextProps.state
    })
  }

    render() {
      let render = this.state.ReduxState.island !== undefined 
                  && this.state.ReduxState.sailing.isMapActive !== undefined
      ? ( <Router /> ) 
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