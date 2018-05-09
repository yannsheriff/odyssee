//  Import modules
// --------------------------------------------------------------
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import React, { Component } from 'react';

//  Import Components
// --------------------------------------------------------------
import Narration from '../components/Island/narration'

//  Import Actions
// --------------------------------------------------------------
import { goToStep } from '../actions/island'



// this component is not smart for optimizing the refresh 

class SmartIsland extends Component {

    render() {
        return (
            <View>
                {/* <Narration /> */}
                <Text style={{color: 'white'}}> Island </Text>
            </View>
        );
    }
}


const mapStateToProps = state => {
    return {
      island: state.island
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      goToStep: (stepId) => {
        dispatch(goToStep(stepId))
      }
    }
  }
  
  const componentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(SmartIsland)
  
  export default componentContainer