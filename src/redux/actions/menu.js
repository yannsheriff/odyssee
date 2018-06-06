export const TOGGLE_MENU = 'TOGGLE_MENU'
export const EQUIP_GLYPH = 'EQUIPE_GLYPHE'
export const UNEQUIP_GLYPH = 'UNEQUIPE_GLYPHE'
export const SAVE_MENU = 'SAVE_MENU'

export function toggleMenu(page=0) {
    return {
        type: TOGGLE_MENU,
        page: page
    }
}

export function equipGlyph(id) {
    return {
        type: EQUIP_GLYPH,
        id: id
    }
}
export function unequipGlyph(id) {
    return {
        type: UNEQUIP_GLYPH,
        id: id
    }
}

export function saveMenu(state) {
    return {
        type: SAVE_MENU,
        state: state
    }
}