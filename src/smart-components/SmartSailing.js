import { updateOrientation } from '../actions/sailing'
import { View } from 'react-native'
import { connect } from 'react-redux'
import React, { Component } from 'react';
import VirtualMap from '../components/Virtual-map'
import Compass from '../components/Compass'

// this component is not smart for optimizing the refresh 

export default class SmartSailing extends Component {

    render() {
        return (
            <View>
                <VirtualMap />
                <Compass />
            </View>
        );
    }
}