import { 
NEXT_SNIPPET, 
SAVE_ISLAND_DATA,
SAVE_NEW_ISLAND,
} from '../actions/island'

import { POPULATE_STORE } from '../actions/loading'

const initialState = {
    currentIslandId: 1,
    screenReaded: [1,5],
    actualSnippetId: 6,
    haveAction: false,
    haveObject: false,
}

export function islandReducer(state = [], action) {
    switch (action.type) {
        case NEXT_SNIPPET:
            return {
                ...state,
                actualSnippetId: action.nextSnippet
            }
        case SAVE_NEW_ISLAND:
            return {
                ...state,
                currentIslandId: action.islandId,
                actualSnippetId: 1
            }
        case SAVE_ISLAND_DATA:
            return state
        
        case POPULATE_STORE:
            return action.payload.island

        default:
            return state
    }
}