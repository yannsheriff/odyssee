import { AppRegistry } from 'react-native';
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Store from './src/redux/store'
import Loading from './src/smart-components/SmartLoading'

import { requestStore } from './src/redux/actions/loading'

class App extends Component {
    constructor() {
        super()
        console.disableYellowBox = true
    }

    render() {
            return  (
                <Provider store={Store}>
                    <Loading />
                </Provider>
            )
        
    }
}


AppRegistry.registerComponent('Odysse', () => App);
