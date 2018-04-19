export const NEXT_SNIPPET = 'NEXT_SNIPPET'



export function goToStep(idSnippet) {
    return {
        type: NEXT_SNIPPET,
        nextSnippet: idSnippet
    }
}
