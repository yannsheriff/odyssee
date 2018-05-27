export const NEXT_SNIPPET = 'NEXT_SNIPPET'
export const PREVIOUS_SNIPPET = 'PREVIOUS_SNIPPET'
export const SAVE_ISLAND_DATA = 'SAVE_ISLAND_DATA'
export const REQUEST_ISLAND_DATA = 'REQUEST_ISLAND_DATA'
export const DISPATCH_ISLAND_DATA = 'DISPATCH_ISLAND_DATA'



export function goToStep(idSnippet) {
    return {
        type: NEXT_SNIPPET,
        nextSnippet: idSnippet,
    }
}


export function saveIslandData(islandState, idSnippet) {
    return {
        type: SAVE_ISLAND_DATA,
        state: islandState,
        nextSnippetId: idSnippet
    }
}


export function goToPreviousStep() {
    return {
        type: PREVIOUS_SNIPPET
    }
}

export function requestIslandData(islandId) {
    return {
        type: REQUEST_ISLAND_DATA,
        islandId: islandId, 
    }
}

export function dispatchIslandData(payload) {
    console.log("Dispatching asked data..")
    return {
        type: DISPATCH_ISLAND_DATA,
        islandId: payload.islandId, 
        screenReaded: payload.screenReaded, 
        actualSnippetId: payload.actualSnippetId, 
    }
}
