import { NEXT_STEP } from '../actions/island'


const initialState = {
    actualStep: 0,
    haveAction: false,
    haveObject: false,
}

export function islandReducer(state = initialState, action) {
    switch (action.type) {
        case NEXT_STEP:
            return {
                ...state,
                actualStep: action.nextStep
            }
        default:
            return state
    }
}