export const NEXT_STEP = 'NEXT_STEP'



export function goToStep(idStep) {
    return {
        type: NEXT_STEP,
        nextStep: idStep
    }
}
