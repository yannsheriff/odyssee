import { createStore } from 'redux'
import reducers from './reducers'
const store = createStore(reducers, { //  initial state
    sailing: {
        orientation: 0,
        isSailing: false
    } 
})

export default store