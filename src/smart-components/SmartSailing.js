import { updateOrientation } from '../actions/sailing'
import { View } from 'react-native'
import { connect } from 'react-redux'
import React, { Component } from 'react';
import Map from '../components/Map'
import Compass from '../components/Compass'



class SmartSailing extends Component {

    componentDidUpdate(){
        console.log('update')
    }
    
    render() {
        return (
            <View>
                <Map { ...this.props.sailing } />
                <Compass { ...this.props } />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        sailing: state.sailing
    }
}


const mapDispatchToProps = dispatch => {
    return {
        updateOrientation: (orientation) => {
            dispatch(updateOrientation(orientation))
        }
    }
}



const componentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SmartSailing)

export default componentContainer