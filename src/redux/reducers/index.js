import { combineReducers } from 'redux'
import { sailingReducer }  from './sailing'
import { islandReducer }  from './island'
import { isOnIsland }  from './isOnIsland'
import { collectables }  from './collectables'

const mainReducer = combineReducers({
    sailing: sailingReducer,
    island: islandReducer, 
    isOnIsland,
    collectables
})

export default mainReducer