export const UPDATE_MODIFIERS = 'UPDATE_MODIFIERS'
export const UPDATE_DESTINATION = 'UPDATE_DESTINATION'
export const UPDATE_POSITION = 'UPDATE_POSITION'
export const SAVE_SAILING = 'SAVE_SAILING'
export const COLLISION = 'COLLISION'

export function updateModifiers (modifiers) {
  return {
    type: UPDATE_MODIFIERS,
    modifiers: modifiers
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

export function collision (islandCollided) {
  return {
    type: COLLISION,
    islandCollided: islandCollided
  }
}