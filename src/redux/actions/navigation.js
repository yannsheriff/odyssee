export const NAVIGATE = "Navigation/NAVIGATE"

export function navigateTo(routeName) {
    return {
        type: NAVIGATE,
        routeName: routeName
    }
}
