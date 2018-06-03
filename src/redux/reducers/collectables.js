import { 
    REQUEST_STORE, 
    POPULATE_STORE 
} from '../actions/loading'

import { NEW_FRAGMENT_FOUND, NEW_GLYPHE_FOUND } from '../actions/collectables'
    
    
export function collectables(state = [], action) {
    switch (action.type) {
        case NEW_FRAGMENT_FOUND:
            return {
                ...state,
                fragments: [].concat(state.fragments, action.fragmentId),
            }
        
        case NEW_GLYPHE_FOUND:
        console.log('reducer', action.fragmentId )
            return {
                ...state,
                fragments: [].concat(state.fragments, action.fragmentId),
                glyphs: [].concat(state.glyphs, action.glypheId),
            }
            
        case REQUEST_STORE:
            return state

        case POPULATE_STORE:
            return action.payload.collectables
            
        default:
            return state
    }
}