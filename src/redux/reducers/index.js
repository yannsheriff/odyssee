import { combineReducers } from 'redux'
import { sailingReducer }  from './sailing'
import { islandReducer }  from './island'
import { isOnIsland }  from './isOnIsland'
import { collectables }  from './collectables'
import { notification }  from './notification'

const mainReducer = combineReducers({
    sailing: sailingReducer,
    island: islandReducer, 
    isOnIsland,
    collectables,
    notification,
})

export default mainReducer