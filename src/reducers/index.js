import { combineReducers } from 'redux'
import { sailingReducer }  from './sailing'

const mainReducer = combineReducers({
    sailing: sailingReducer
})

export default mainReducer