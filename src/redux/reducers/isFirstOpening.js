import { 
    POPULATE_STORE,
} from '../actions/loading'

import { FIRST_TIME } from "../actions/isFirstOpening";
    
    
export function isFirstOpening(state = false, action) {
    switch (action.type) {

        case POPULATE_STORE:
            return action.payload.isFirstOpening
        
        case FIRST_TIME:
            return false

        default:
            return state
    }
}