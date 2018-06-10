import { menu } from './menu'
import { sound } from './sound'
import { isOnIsland }  from './isOnIsland'
import { collectables }  from './collectables'
import { notification }  from './notification'
import { islandReducer }  from './island'
import { sailingReducer }  from './sailing'
import { combineReducers } from 'redux'
import { navigationReducer }  from './navigation'

const mainReducer = combineReducers({
    nav: navigationReducer,
    sailing: sailingReducer,
    island: islandReducer, 
    isOnIsland,
    collectables,
    notification,
    menu,
    sound,
})

export default mainReducer