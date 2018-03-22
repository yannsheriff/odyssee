import { changeScreen } from '../actions/screenActions'
import { connect } from 'react-redux'
import React, { Component } from 'react';
import BoilComponent from '../components/BoilComponent'



class SmartBoilComponent extends Component {

    render() {
        return (
            <BoilComponent { ...this.props } />
        );
    }
}

const mapStateToProps = state => {
    return {
        screenState: state.screenReducer
    }
}


const mapDispatchToProps = dispatch => {
    return {
        changeScreen: () => {
            dispatch(changeScreen())
        }
    }
}



const componentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SmartBoilComponent)

export default componentContainer