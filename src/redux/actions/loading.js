export const REQUEST_STORE = 'REQUEST_STORE'
export const POPULATE_STORE = 'POPULATE_STORE'



export function requestStore() {
    return {
        type: REQUEST_STORE,
    }
}

export function populateStore(store) {
    return {
        type: POPULATE_STORE,
        payload: store
    }
}

