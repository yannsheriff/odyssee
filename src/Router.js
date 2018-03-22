// Libs Imports
// ----------------------------
import React, { Component, } from 'react';
import { StackNavigator } from 'react-navigation';

// Scenes Imports
// ----------------------------
import Sailing from './smart-components/SmartSailing';



const InitialNavigator = StackNavigator({
  Home: {
    screen: Sailing
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



