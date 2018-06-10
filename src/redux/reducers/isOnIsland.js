import { 
    REQUEST_STORE, 
    POPULATE_STORE ,
} from '../actions/loading'

import { CHANGE_LOCATION } from "../actions/isOnIsland";
    
    
export function isOnIsland(state = false, action) {
    switch (action.type) {

        case REQUEST_STORE:
            return state

        case POPULATE_STORE:
            return action.payload.isOnIsland
        
        case CHANGE_LOCATION:
            console.log('alriiiiiiiiight')
            return action.state

        default:
            return state
    }
}