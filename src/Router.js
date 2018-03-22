// Libs Imports
// ----------------------------
import React, { Component, } from 'react';
import { StackNavigator } from 'react-navigation';

// Scenes Imports
// ----------------------------
import SmartBoilerComponent from './smart-components/SmartBoilComponent';



const InitialNavigator = StackNavigator({
  Home: {
    screen: SmartBoilerComponent
  }
},
  {
    headerMode: 'none',
    initialRouteName: 'Home',
    cardStyle: {
      backgroundColor: 'transparent'
    }
  })


  export default InitialNavigator



