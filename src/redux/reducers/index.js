import { combineReducers } from 'redux'
import { sailingReducer }  from './sailing'
import { islandReducer }  from './island'
import { isOnIsland }  from './isOnIsland'

const mainReducer = combineReducers({
    sailing: sailingReducer,
    island: islandReducer, 
    isOnIsland
})

export default mainReducer