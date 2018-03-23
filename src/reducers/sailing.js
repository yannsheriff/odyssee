import { UPDATE_ORIENTATION } from '../actions/sailing'
import { TOGGLE_SAILING } from '../actions/sailing'

const initialState = {
    orientation: 0,
    isSailing: false
}

export function sailingReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_ORIENTATION:
            return {
                ...state,
                orientation: action.orientation
            }
        case TOGGLE_SAILING:
            return {
                ...state,
                isSailing: !state.isSailing
            }
        default:
            return state
    }
}
