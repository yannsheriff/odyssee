import { NAVIGATE } from '../actions/navigation'
    
    
export function sound(state = "Home", action) {
    switch (action.type) {

        case NAVIGATE:
            if (action.routeName === "Island"){
                return "Island"
            }
            if (action.routeName === "Home") {
                return "Home"
            }
            if (action.routeName === "Sailing") {
                return "Sailing"
            }
            if (action.routeName === "Introduction") {
                return "Introduction"
            }

        default:
            return state
    }
}