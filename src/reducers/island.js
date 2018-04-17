import { NEXT_SNIPPET } from '../actions/island'


const initialState = {
    actualSnippet: 0,
    haveAction: false,
    haveObject: false,
}

export function islandReducer(state = initialState, action) {
    switch (action.type) {
        case NEXT_SNIPPET:
            return {
                ...state,
                actualSnippet: action.nextSnippet
            }
        default:
            return state
    }
}