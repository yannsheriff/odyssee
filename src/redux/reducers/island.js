import { 
NEXT_SNIPPET, 
SAVE_ISLAND_DATA,
REQUEST_ISLAND_DATA,
DISPATCH_ISLAND_DATA,
PREVIOUS_SNIPPET
} from '../actions/island'

import { POPULATE_STORE } from '../actions/loading'


export function islandReducer(state = [], action) {
    switch (action.type) {
        case NEXT_SNIPPET:
            return {
                ...state,
                screenReaded: state.screenReaded ? state.screenReaded.concat(state.actualSnippetId) : [state.actualSnippetId],
                actualSnippetId: action.nextSnippet
            }
        case PREVIOUS_SNIPPET:
            let prevSnippet = getPreviousSnipet(state)
            return {
                ...state,
                screenReaded: state.screenReaded ? state.screenReaded.concat(state.actualSnippetId) : [state.actualSnippetId],
                actualSnippetId: prevSnippet
            }
        case DISPATCH_ISLAND_DATA:
            return {
                ...state,
                currentIslandId: action.islandId,
                actualSnippetId: action.actualSnippetId,
                screenReaded: action.screenReaded
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


function getPreviousSnipet(state) {
    let current = state.actualSnippetId
    let screenReaded = state.screenReaded
    let reverseArray = screenReaded.slice().reverse()
    let prevSnippet = reverseArray.find((screenID)=> {
      if(screenID < current) {
        return screenID
      }
    })
    console.log("Sreen Readed : ", screenReaded)
    console.log("Reversed : ",reverseArray)
    console.log(prevSnippet)
    return prevSnippet
}
