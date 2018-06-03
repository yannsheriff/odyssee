
export const NEW_FRAGMENT_FOUND = 'NEW_FRAGMENT_FOUND'
export const NEW_GLYPHE_FOUND = 'NEW_GLYPHE_FOUND'
export const SAVE_COLLECTABLES = 'SAVE_COLLECTABLES'

export function foundNewCollectable(fragmentId) {
    return {
        type: NEW_FRAGMENT_FOUND,
        fragmentId: fragmentId
    }
}

export function foundNewGlyphe(glypheId, fragmentId) {
    return {
        type: NEW_GLYPHE_FOUND,
        glypheId: glypheId,
        fragmentId: fragmentId
    }
}

export function saveCollectables (state) {
    return {
        type: SAVE_COLLECTABLES,
        state: state
    }
}