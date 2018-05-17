export const UPDATE_ORIENTATION = 'UPDATE_ORIENTATION'
export const TOGGLE_SAILING = 'TOGGLE_SAILING'
export const CALL_MAP = 'CALL_MAP'
export const LAUNCH_MAP = 'LAUNCH_MAP'
export const HIDE_MAP = 'HIDE_MAP'
export const UPDATE_DESTINATION = 'UPDATE_DESTINATION'
export const UPDATE_POSITION = 'UPDATE_POSITION'
export const SAVE_SAILING = 'SAVE_SAILING'
export const COLLISION = 'COLLISION'


export function updateOrientation (orientation) {
    return {
        type: UPDATE_ORIENTATION,
        orientation: orientation
    }
}

export function toggleSailing () {
    return {
        type: TOGGLE_SAILING
    }
}

export function callMap () {
    return {
        type: CALL_MAP
    }
}

export function launchMap (position) {
    return {
        type: LAUNCH_MAP,
        position: position
    }
}

export function hideMap () {
    return {
        type: HIDE_MAP
    }
}

export function updateDestination (destination) {
  return {
    type: UPDATE_DESTINATION,
    destination: destination
  }
}

export function updatePosition (position) {
  return {
    type: UPDATE_POSITION,
    position: position
  }
}

export function saveSailing (state) {
  return {
    type: SAVE_SAILING,
    state: state
  }
}

export function collision () {
  return {
    type: COLLISION
  }
}