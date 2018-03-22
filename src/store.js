import { createStore } from 'redux'
import reducers from './reducers'
const store = createStore(reducers, { //  initial state
    screenReducer: {
        screen: 0
    } 
})

export default store