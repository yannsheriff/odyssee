import { 
    REQUEST_STORE, 
    POPULATE_STORE ,
} from '../actions/loading'

import { NAVIGATE } from '../actions/navigation'
    
    
export function isOnIsland(state = false, action) {
    switch (action.type) {

        case REQUEST_STORE:
            return state

        case POPULATE_STORE:
            return action.payload.isOnIsland
        
        case NAVIGATE:
            return action.routeName === "Island" ? true : false

        default:
            return state
    }
}