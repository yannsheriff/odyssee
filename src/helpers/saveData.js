import { AsyncStorage } from 'react-native';

let instance = null;
class StoreService {
  constructor() {
    if(!instance){
      instance = this;
    }
    return instance;
  }


  async get(itemKey) {
    try {
      return await AsyncStorage.getItem(itemKey);
    } catch (error) {
      throw error;
    }
  }
  
  async getSaving() {
    try {
      let dataSaved = await AsyncStorage.getItem("saved");
      return JSON.parse(dataSaved)
    } catch (error) {
      return {
        isOnIsland: null,
        isTutoFinished: false,
        visitedIsland:[
          {
            id: 2,
            screenReaded: [],
            actualSnippetId: 1,
            haveAction: false,
            haveObject: false,
          }
        ],
        navigation: {
          position: {
            x: 0,
            y: 0
          },
          collectableEquipped: []
        }
      }
    }
  }
  
  async save(selectedValue) {
    try {
      let jsonValue = JSON.stringify(selectedValue);
      return await AsyncStorage.setItem("saved", jsonValue);
    } catch (error) {
      throw error;
    }
  }

  async set(itemKey, selectedValue) {
    try {
      let jsonValue = JSON.stringify(selectedValue);
      return await AsyncStorage.setItem(itemKey, jsonValue);
    } catch (error) {
      throw error;
    }
  }

  async remove(itemKey) {
    try {
      return await AsyncStorage.removeItem(itemKey);
    } catch (error) {
      throw error;
    }
  }
  
  async loadState() { //  initial state
    try {
      let dataSaved = await this.getSaving()
      console.log(' ================ Async Storage ================ ')
      console.log("last Save :", dataSaved )
      

      var state = {
        isOnIsland: false,
        sailing: {
          orientation: 0,
          position: {
              x: dataSaved.navigation.position.x,
              y: dataSaved.navigation.position.y
          },
          isSailing: false,
          callMap: false,
          isMapActive: false,
          collectableEquipped: dataSaved.navigation.collectableEquipped
        },
        island: {
            currentIslandId: null,
            actualSnippetId: 1,
            haveAction: false,
            haveObject: false,
        }
      }
      if (dataSaved.isOnIsland) {
        let actualIsland = dataSaved.visitedIsland.find((island) => { if( island.id === dataSaved.isOnIsland) { return island }})
        state.island.currentIslandId = dataSaved.isOnIsland
        state.island.actualSnippetId = actualIsland.actualSnippetId
        state.isOnIsland = dataSaved.isOnIsland
      }

    } catch (error) {
      var state = {
        isOnIsland: false,
        sailing: {
          orientation: 0,
          position: {
              x: 0,
              y: 0
          },
          isSailing: false,
          callMap: false,
          isMapActive: false,
          collectableEquipped: []
        },
        island: {
            currentIslandId: null,
            actualSnippetId: 1,
            haveAction: false,
            haveObject: false,
        }
      }
    }
    return state
  }
}

export let storeService = new StoreService();
