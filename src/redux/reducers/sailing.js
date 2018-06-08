import {
  UPDATE_ORIENTATION,
  UPDATE_MODIFIERS,
  TOGGLE_SAILING,
  CALL_MAP,
  LAUNCH_MAP,
  HIDE_MAP,
  UPDATE_DESTINATION,
  UPDATE_POSITION,
  SAVE_SAILING,
  COLLISION
} from '../actions/sailing'

import { 
  EQUIP_GLYPH,
  UNEQUIP_GLYPH
} from '../actions/menu'

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
  islandCollided: null,
  destination: {
    id: '',
    x: '',
    y: ''
  },
  modifiers: {
    strength: 0,
    direction: 0
  }
}

export function sailingReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_ORIENTATION:
      return {
        ...state,
        orientation: action.orientation
      }
    case UPDATE_MODIFIERS:
      return {
        ...state,
        modifiers: action.modifiers
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
    case COLLISION:
      return {
        ...state,
        islandCollided: action.islandCollided
      }
    case SAVE_SAILING:
      return state
    case POPULATE_STORE:
      return action.payload.sailing

    case EQUIP_GLYPH:
      return {
          ...state,
          collectableEquipped: [...state.collectableEquipped, action.id]
      }

    case UNEQUIP_GLYPH:
      return {
          ...state,
          collectableEquipped: state.collectableEquipped.filter(el => el !== action.id)
      }
  
    default:
      return state
  }
}
