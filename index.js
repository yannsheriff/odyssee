import { AppRegistry } from 'react-native';
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Store from './src/store'
import Router from './src/Router'

class App extends Component {
    constructor() {
        super()
        console.disableYellowBox = true
    }

    render() {
            return  (
                <Provider store={Store}>
                    <Router/>
                </Provider>
            )
    }
}


AppRegistry.registerComponent('Odysse', () => App);
