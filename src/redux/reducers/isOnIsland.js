import { 
    REQUEST_STORE, 
    POPULATE_STORE 
} from '../actions/loading'
    
    
export function isOnIsland(state = false, action) {
    switch (action.type) {
        case REQUEST_STORE:
            return state

        case POPULATE_STORE:
            return action.payload.isOnIsland
            
        default:
            return state
    }
}