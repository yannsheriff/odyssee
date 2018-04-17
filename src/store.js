import { createStore } from 'redux'
import reducers from './reducers'
const store = createStore(reducers, { //  initial state
    sailing: {
        orientation: 0,
        isSailing: false
    },
    island: {
        actualStep: 0,
        haveAction: false,
        haveObject: false,
    }
})

export default store