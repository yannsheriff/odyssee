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

    let dataSaved = await AsyncStorage.getItem("saved");

    if (dataSaved !== null && dataSaved) {
      return JSON.parse(dataSaved)
    } else {
      let createSaving = {
        isOnIsland: false,
        isTutoFinished: false,
        collectables: {
          fragments:[],
          glyphs: []
        },
        menu: {
          displayMenu: false,
          collectableEquipped: [],
        },
        visitedIsland:[{}],
        sailing: {
          orientation: 0,
          position: {
              x: 0,
              y: 0
          },
          isSailing: false,
          callMap: false,
          isMapActive: false,
          islandCollided: null,
          collectableFound: [],
          collectableEquipped: [],
          destination: { 
            id: '', 
            x: '',
            y: '',
          }
        }
      }

      await this.save(createSaving)
      return {
        isNewInstance: true,
        ...createSaving
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
      const dataSaved = await this.getSaving()
      if (dataSaved.isNewInstance ) {
        var state = {
          notification: {
            title: undefined,
            subtitle: undefined,
            animation: undefined,
          },
          isOnIsland: false,
          menu: {
            displayMenu: false,
            collectableEquipped: [],
          },
          collectables: {
            fragments:[],
            glyphs: []
          },
          sailing: {
            orientation: 0,
            position: {
                x: 0,
                y: 0
            },
            isSailing: false,
            callMap: false,
            isMapActive: false,
            islandCollided: null,
            collectableEquipped: [],
            destination: { 
              id: '', 
              x: '',
              y: '',
            }
          },
          island: {
              currentIslandId: null,
              screenReaded: [],
              actualSnippetId: 17,
              haveAction: false,
              haveObject: false,
          }
        }
        return state
      } else {
        console.log(' ================ Async Storage ================ ')
        console.log("last Save :", dataSaved )
        var state = {
          notification: {
            title: undefined,
            subtitle: undefined,
            animation: undefined,
          },
          isOnIsland: dataSaved.isOnIsland,
          menu: {
            displayMenu: false,
            collectableEquipped: dataSaved.menu.collectableEquipped,
          },
          collectables: {
            fragments: dataSaved.collectables.fragments,
            glyphs: dataSaved.collectables.glyphs
          },
          sailing: {
            orientation: dataSaved.sailing.orientation ? dataSaved.sailing.orientation : 0,
            position: {
                x: dataSaved.sailing.position.x,
                y: dataSaved.sailing.position.y
            },
            isSailing: false,
            callMap: false,
            isMapActive: false,
            islandCollided: null,
            collectableEquipped: dataSaved.sailing.collectableEquipped,
            destination: { 
              id: dataSaved.sailing.destination.id, 
              x: dataSaved.sailing.destination.id,
              y: dataSaved.sailing.destination.id,
            }
          },
          island: {
              currentIslandId: null,
              screenReaded: [],
              actualSnippetId: 1,
              haveAction: false,
              haveObject: false,
          }
        }
        // if (dataSaved.isOnIsland) {
        //   let actualIsland = dataSaved.visitedIsland.find((island) => { if( island.id === dataSaved.isOnIsland) { return island }})
        //   state.island.currentIslandId = dataSaved.isOnIsland
        //   state.island.actualSnippetId = actualIsland.actualSnippetId
        //   state.isOnIsland = dataSaved.isOnIsland
        // }
        return state
      }
  }
}

export let storeService = new StoreService();
