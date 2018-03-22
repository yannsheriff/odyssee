import { UPDATE_ORIENTATION } from '../actions/sailing'

export function sailingReducer(state = { orientation: 0 }, action) {
    switch (action.type) {
        case UPDATE_ORIENTATION:
            return {
                ...state,
                orientation: action.orientation
            }
        default:
            return state
    }
}
