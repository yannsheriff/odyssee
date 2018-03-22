export const UPDATE_ORIENTATION = 'UPDATE_ORIENTATION'

export function updateOrientation(orientation) {
    return {
        type: UPDATE_ORIENTATION,
        orientation: orientation
    }
}
