
// Libs Imports
// ----------------------------
import React from 'react';
import { StackNavigator } from 'react-navigation';
import NavigationStack from "../../Navigation";



const initialState = NavigationStack.router.getStateForAction(NavigationStack.router.getActionForPathAndParams('Home'))

export function navigationReducer (state = initialState, action) {
  
    // **action**  will be of type: {"type": "Navigation/NAVIGATE", "routeName": SOME_ROUTE}
    // gets the new updated state of the navigator (previous state + new route), will return null if the action is not understandable.
    const newState = NavigationStack.router.getStateForAction(action, state)
    
    // return newState or previous state if newState is null
    return newState || state;
}