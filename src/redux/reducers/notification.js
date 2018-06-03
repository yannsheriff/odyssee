import { PLAY_NOTIFICATION } from '../actions/notification'
    
    
export function notification(state = [], action) {
    switch (action.type) {
        case PLAY_NOTIFICATION:
        console.log(action)
            return {
                ...state,
                title: action.payload.title,
                subtitle: action.payload.subtitle ? action.payload.subtitle : null, 
                animation: action.payload.animPath ? action.payload.animPath : null
            }
            
        default:
            return state
    }
}