// Libs Imports
// ----------------------------
import React, { Component, } from 'react';
import { StackNavigator, addNavigationHelpers, } from 'react-navigation';

// Scenes Imports
// ----------------------------
import NavigationStack from "./Navigation";

import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

import { connect } from 'react-redux'




const addListener = createReduxBoundAddListener("root");

class AppNavigation extends Component {
  render() {
      const { navigationState, dispatch } = this.props;
      return(
          <NavigationStack 
              navigation={addNavigationHelpers({ dispatch, state: navigationState, addListener })} // passing our navigation prop (consisting of dispatch and state) to AppNavigator.
          />
      )
  }
}

const mapStateToProps = (state) => {
  return ({
    navigationState: state.nav // NavigationReducer contains the navigation state of the app
  })
}


export default connect(mapStateToProps)(AppNavigation)



