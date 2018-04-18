import { NEXT_SNIPPET } from '../actions/island'


const initialState = {
    actualSnippetId: 0,
    haveAction: false,
    haveObject: false,
}

export function islandReducer(state = initialState, action) {
    switch (action.type) {
        case NEXT_SNIPPET:
            return {
                ...state,
                actualSnippetId: action.nextSnippet
            }
        default:
            return state
    }
}