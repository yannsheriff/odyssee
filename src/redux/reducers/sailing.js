import {
  UPDATE_ORIENTATION,
  TOGGLE_SAILING,
  CALL_MAP,
  LAUNCH_MAP,
  HIDE_MAP,
  UPDATE_DESTINATION,
  UPDATE_POSITION,
  SAVE_SAILING
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
  isMapActive: false,
  destination: {
    id: '',
    x: '',
    y: ''
  }
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
    case UPDATE_DESTINATION:
      return {
        ...state,
        destination: action.destination
      }
    case UPDATE_POSITION:
      return {
        ...state,
        position: action.position
      }
    case SAVE_SAILING:
      return state

    case POPULATE_STORE:
      return action.payload.sailing
    default:
      return state
  }
}
