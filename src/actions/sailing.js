export const UPDATE_ORIENTATION = 'UPDATE_ORIENTATION'
export const TOGGLE_SAILING = 'TOGGLE_SAILING'
export const CALL_MAP = 'CALL_MAP'
export const LAUNCH_MAP = 'LAUNCH_MAP'
export const HIDE_MAP = 'HIDE_MAP'


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