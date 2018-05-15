// Libs Imports
// ----------------------------
import React, { Component, } from 'react';
import { StackNavigator } from 'react-navigation';

// Scenes Imports
// ----------------------------
import Sailing from './smart-components/SmartSailing';
import Accueil from './components/Home-prov';
import MultiAction from './components/Multi-action-button';
import Island from './smart-components/SmartIsland';



const InitialNavigator = StackNavigator({
  Home: {
    screen: Accueil
  }, 
  Sailing: {
    screen: Sailing
  },
  Island: {
    screen: Island
  },
  Test: {
    screen: MultiAction
  },
},
  {
    headerMode: 'none',
    initialRouteName: 'Home',
    cardStyle: {
      backgroundColor: 'transparent'
    }
  })


  export default InitialNavigator



