export const NEXT_SNIPPET = 'NEXT_SNIPPET'
export const SAVE_ISLAND_DATA = 'SAVE_ISLAND_DATA'
export const SAVE_NEW_ISLAND = 'SAVE_NEW_ISLAND'



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


export function saveNewIsland(islandId) {
    return {
        type: SAVE_NEW_ISLAND,
        islandId: islandId
    }
}
