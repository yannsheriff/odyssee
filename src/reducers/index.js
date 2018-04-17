import { combineReducers } from 'redux'
import { sailingReducer }  from './sailing'
import { islandReducer }  from './island'

const mainReducer = combineReducers({
    sailing: sailingReducer,
    island: islandReducer, 
})

export default mainReducer