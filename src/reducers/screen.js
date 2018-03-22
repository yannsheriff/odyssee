import { CHANGE_SCREEN } from '../actions/screenActions'

export function screenReducer(state = { screen: 0 }, action) {
    switch (action.type) {
        case CHANGE_SCREEN:
            let newScreen = state.screen + 1
            newScreen = newScreen == 3 ? 0 : newScreen

            return {
                ...state,
                screen: newScreen
            }
        default:
            return state
    }
}
