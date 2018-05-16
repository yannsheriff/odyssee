import {
  UPDATE_ORIENTATION,
  TOGGLE_SAILING,
  CALL_MAP,
  LAUNCH_MAP,
  HIDE_MAP,
} from '../actions/sailing'

import { POPULATE_STORE } from '../actions/loading'

const initialState = {
    orientation: 0,
    position: {
        x: 0,
        y: 0
    },
    isSailing: false,
    callMap: false,
    isMapActive: false
}

export function sailingReducer(state = [], action) {
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
        case CALL_MAP:
            return {
                ...state,
                isSailing: false,
                callMap: true
            }
        case LAUNCH_MAP:
            return {
                ...state,
                isMapActive: true,
                callMap: false,
                position: action.position
            }
        case HIDE_MAP:
            return {
                ...state,
                isMapActive: false
            }
        case POPULATE_STORE:
            return action.payload.sailing

        default:
            return state
    }
}
