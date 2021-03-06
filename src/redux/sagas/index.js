import { put, takeEvery, all, select } from 'redux-saga/effects'
import { SAVE_ISLAND_DATA, REQUEST_ISLAND_DATA, dispatchIslandData } from '../actions/island'
import { SAVE_SAILING } from '../actions/sailing'
import { SAVE_MENU } from '../actions/menu'
import { NAVIGATE } from '../actions/navigation'
import { changeLocation } from "../actions/isOnIsland";
import { SAVE_COLLECTABLES } from '../actions/collectables'
import { REQUEST_STORE, populateStore } from '../actions/loading'
import { FIRST_TIME } from '../actions/isFirstOpening'
import { storeService } from '../../helpers/saveData'
const delay = (ms) => new Promise(res => setTimeout(res, ms))

export function* helloSaga() {
    console.log('Hello Sagas!')
}

export function* saveIsOnIsland(action) {
  
  yield delay(1000)
  const state = yield select()
  const data = yield storeService.getSaving()
  
  if(action.routeName === "Sailing" || action.routeName === "Island") {
    console.log('Saving position data ⏳')
    if (action.routeName === "Sailing") {
      var newState = {
        ...data,
        isOnIsland: false,
      }
    } else if (action.routeName === "Island"){
      var newState = {
        ...data,
        isOnIsland: state.island.currentIslandId,
      }
    }
    yield put(changeLocation(newState.isOnIsland))
    yield storeService.save(newState)
    console.log('Saved ✅')
  }
}

export function* saveFirstOpening() {
  
  yield delay(2000)
  const state = yield select()
  const data = yield storeService.getSaving()
  var newState = {
    ...data,
    isFirstOpening: false
  }
  yield storeService.save(newState)
}

export function* saveSailingData(action) {
  console.log('Saving data ⏳')
  const data = yield storeService.getSaving()
  const state = yield select()

  var newState = {
    ...data,
    sailing: state.sailing
  }
  console.log('state', state)
  yield storeService.save(newState)
  console.log('Saved ✅')
}

export function* saveIslandData(action) {
  const data = yield storeService.getSaving()
  console.log('Saving Island data ⏳')
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
  console.log('Saving Menu data ⏳')
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

    var payload = {
      actualSnippetId: 1,
      islandId: actualIsland.id,
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

export function* wachIsFirstOpening() {
  yield takeEvery(FIRST_TIME, saveFirstOpening)
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
    watchSavingIsOnIsland(),
    wachIsFirstOpening()
  ])
}