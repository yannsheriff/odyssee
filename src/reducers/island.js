import { 
NEXT_SNIPPET, 
SAVE_ISLAND_DATA 
} from '../actions/island'


const initialState = {
    currentIslandId: 1,
    screenReaded: [1,5],
    actualSnippetId: 6,
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
        case SAVE_ISLAND_DATA:
            return state
            
        default:
            return state
    }
}