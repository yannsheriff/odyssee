// Libs Imports
// ----------------------------
import React, { Component, } from 'react';
import { StackNavigator } from 'react-navigation';

// Scenes Imports
// ----------------------------
import Sailing from './smart-components/SmartSailing';
import Accueil from './components/Home-prov';
import test from './components/test';
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
    screen: test
  },
},
  {
    headerMode: 'none',
    initialRouteName: 'Island',
    cardStyle: {
      backgroundColor: 'transparent'
    }
  })


  export default InitialNavigator



