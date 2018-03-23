export const UPDATE_ORIENTATION = 'UPDATE_ORIENTATION'
export const TOGGLE_SAILING = 'TOGGLE_SAILING'


export function updateOrientation(orientation) {
    return {
        type: UPDATE_ORIENTATION,
        orientation: orientation
    }
}

export function toggleSailing() {
    return {
        type: TOGGLE_SAILING,
    }
}
