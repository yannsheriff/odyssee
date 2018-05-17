import { 
NEXT_SNIPPET, 
SAVE_ISLAND_DATA,
REQUEST_ISLAND_DATA,
DISPATCH_ISLAND_DATA,
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
        case DISPATCH_ISLAND_DATA:
            return {
                ...state,
                currentIslandId: action.islandId,
                actualSnippetId: action.actualSnippetId
            }
        case REQUEST_ISLAND_DATA:
            return state

        case SAVE_ISLAND_DATA:
            return state
        
        case POPULATE_STORE:
            return action.payload.island

        default:
            return state
    }
}