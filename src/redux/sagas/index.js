import { put, takeEvery, all, select } from 'redux-saga/effects'
import { SAVE_ISLAND_DATA, REQUEST_ISLAND_DATA, dispatchIslandData } from '../actions/island'
import { SAVE_SAILING } from '../actions/sailing'
import { SAVE_MENU } from '../actions/menu'
import { NAVIGATE } from '../actions/navigation'
import { SAVE_COLLECTABLES } from '../actions/collectables'
import { REQUEST_STORE, populateStore } from '../actions/loading'
import { storeService } from '../../helpers/saveData'

export function* helloSaga() {
    console.log('Hello Sagas!')
}

export function* saveIsOnIsland() {
  const data = yield storeService.getSaving()
  const state = yield select();
  console.log('Saving data ⏳')

  var newState = {
    ...data,
    isOnIsland: state.isOnIsland
  }
  yield storeService.save(newState)
  console.log('Saved ✅')
}

export function* saveSailingData(action) {
  console.log('Saving data ⏳')
  const data = yield storeService.getSaving()
  console.log(action)
  let newSailing = {
    orientation: action.state.orientation,
    position: {
        x: action.state.position.x,
        y: action.state.position.y
    },
    isSailing: false,
    callMap: false,
    isMapActive: false,
    collectableEquipped: action.state.collectableEquipped,
    destination: { 
      id: action.state.destination.id, 
      x: action.state.destination.x,
      y: action.state.destination.y,
    },
    modifiers: {
      strength: action.state.modifiers.strength,
      direction: action.state.modifiers.direction
    }
  }

  var newState = {
    ...data,
    sailing: newSailing
  }
  console.log(newState)
  yield storeService.save(newState)
  console.log('Saved ✅')
}

export function* saveIslandData(action) {
  const data = yield storeService.getSaving()
  console.log('Saving data ⏳')
    let actualIslandSavedData = data.visitedIsland.find((island, index) => { if( island.id === action.state.currentIslandId) { return island }})
    
    // If existe
    if (actualIslandSavedData) {
      // Create a new occurence of visited island
      let newActualIslandState = {
        ...actualIslandSavedData,
        screenReaded: actualIslandSavedData.screenReaded.concat(action.state.actualSnippetId),
        actualSnippetId: action.nextSnippetId,
      }
      
      // Create a new occurence of the saved state
      var newState = {
        ...data,
        visitedIsland: data.visitedIsland.map((island) => {
          if (island.id === action.state.currentIslandId) {
            return newActualIslandState
          } else {
            return island
          }
        })
      }

      console.log("newState", newState)

    } 
  // Save data to Async storage
  yield storeService.save(newState)
  console.log('Saved ✅')
}

export function* saveCollectablesData(action) {
  const data = yield storeService.getSaving()
  console.log('Saving data ⏳')
  console.log(action)
  var newState = {
    ...data,
    collectables: {
      fragments: action.state.fragments,
      glyphs: action.state.glyphs,
    }
  }
  yield storeService.save(newState)
  console.log('Saved ✅')
}

export function* saveMenuData(action) {
  const data = yield storeService.getSaving()
  console.log('Saving data ⏳')
  console.log(action)
  var newState = {
    ...data,
    menu: {
      displayMenu: false,
      collectableEquipped: action.state.collectableEquipped,
    }
  }
  yield storeService.save(newState)
  console.log('Saved ✅')
}

export function* dispatchPopulateStore() {
  console.log('Populating data ⏳')
  const data = yield storeService.loadState()
  yield put (populateStore(data))
  console.log('Populated ✅')
}

export function* requestIslandData(action) {
  console.log('asking data ⏳')
  const data = yield storeService.getSaving()
  console.log(data)
  let actualIslandSavedData = data.visitedIsland.find((island) => { 
    if( island.id === action.islandId) { return island }
  })
  // If this island have been visited before 
  if (actualIslandSavedData) {
    console.log('data exist !')
    let snippetID = actualIslandSavedData.actualSnippetId === 9999 
      ? 1
      : actualIslandSavedData.actualSnippetId
    let payload = {
      screenReaded: actualIslandSavedData.screenReaded,
      islandId: actualIslandSavedData.id,
      actualSnippetId: snippetID
    }
    yield put (dispatchIslandData(payload)) // return data
  // Else create a new occurence of Island
  } else {
    console.log('data doesn\'t exist, let\'s create it !')
    let actualIsland = {
      id: action.islandId,
      screenReaded: [],
      actualSnippetId: 1,
      haveAction: false,
      haveObject: false,
    }
    let newState = {
      ...data,
      visitedIsland: data.visitedIsland.concat(actualIsland),
    }

    let payload = {
      islandId: actualIsland.id,
      actualSnippetId: 1
    }

    yield put (dispatchIslandData(payload))
    yield storeService.save(newState)
  }
}



// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchSavingAsync() {
  yield takeEvery(SAVE_ISLAND_DATA, saveIslandData)
}

export function*  watchSavingSailing() {
  yield takeEvery(SAVE_SAILING, saveSailingData)
}

export function*  watchSavingIsOnIsland() {
  yield takeEvery(NAVIGATE, saveIsOnIsland)
}

export function*  watchSavingMenu() {
  yield takeEvery(SAVE_MENU, saveMenuData)
}

export function* watchSavingCollectables() {
  yield takeEvery(SAVE_COLLECTABLES, saveCollectablesData)
}

export function* watchRequestIslandData() {
  yield takeEvery(REQUEST_ISLAND_DATA, requestIslandData)
}

export function* watchPopulateStore() {
  yield takeEvery(REQUEST_STORE, dispatchPopulateStore)
}


// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchSavingAsync(),
    watchPopulateStore(),
    watchRequestIslandData(),
    watchSavingSailing(),
    watchSavingCollectables(),
    watchSavingMenu(),
    watchSavingIsOnIsland()
  ])
}