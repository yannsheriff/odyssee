import { combineReducers } from 'redux'
import { sailingReducer }  from './sailing'
import { islandReducer }  from './island'
import { isOnIsland }  from './isOnIsland'
import { collectables }  from './collectables'
import { notification }  from './notification'
import { menu } from './menu'

const mainReducer = combineReducers({
    sailing: sailingReducer,
    island: islandReducer, 
    isOnIsland,
    collectables,
    notification,
    menu,
})

export default mainReducer