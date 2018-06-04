import { 
    TOGGLE_MENU,
    EQUIP_GLYPH,
    UNEQUIP_GLYPH
} from '../actions/menu'

import { POPULATE_STORE } from '../actions/loading'


export function menu(state = {}, action) {
    switch (action.type) {
        case TOGGLE_MENU:
            return {
                ...state,
                displayMenu: !state.displayMenu
            }
        
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
        

        case POPULATE_STORE:
            return action.payload.menu
            
        default:
            return state
    }
}