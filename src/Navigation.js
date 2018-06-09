import { StackNavigator } from "react-navigation";
import Accueil from './components/Home-prov';
import test from './components/test';
import Island from './smart-components/SmartIsland';
import Sailing from './smart-components/SmartSailing';
import Introduction from './components/Introduction-video';

const InitialNavigator = StackNavigator({
    Home: {
      screen: Accueil
    }, 
    Sailing: {
      screen: Sailing,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    Island: {
      screen: Island,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    Test: {
      screen: test
    },
    Introduction: {
      screen: Introduction
    },
  }, {
    headerMode: 'none',
    gesturesEnabled: false,
  })


  

  export default InitialNavigator;