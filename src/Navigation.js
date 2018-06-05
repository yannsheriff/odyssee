import { StackNavigator } from "react-navigation";
import Accueil from './components/Home-prov';
import test from './components/test';
import Island from './smart-components/SmartIsland';
import Sailing from './smart-components/SmartSailing';

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
  }, {
    headerMode: 'none',
  })

  export default InitialNavigator;