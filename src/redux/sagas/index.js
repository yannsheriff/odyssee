import { delay } from 'redux-saga'
import { put, takeEvery, all } from 'redux-saga/effects'
import { SAVE_ISLAND_DATA, REQUEST_ISLAND_DATA, dispatchIslandData } from '../actions/island'
import { SAVE_SAILING } from '../actions/sailing'
import { REQUEST_STORE, populateStore } from '../actions/loading'
import { storeService } from '../../helpers/saveData'

export function* helloSaga() {
    console.log('Hello Sagas!')
}


export function* saveSailingData(action) {
  console.log('Saving data ⏳')
  const data = yield storeService.getSaving()

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
    }
  }

  var newState = {
    ...data,
    sailing: newSailing
  }
  yield storeService.save(newState)
  console.log('Saved ✅')
}

// Our worker Saga: will perform the async increment task
export function* saveDataAsync(action) {
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
    } 
  // Save data to Async storage
  console.log('state : ', newState)
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
  console.log(data.visitedIsland)
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
  yield takeEvery(SAVE_ISLAND_DATA, saveDataAsync)
}

export function* watchPopulateStore() {
  yield takeEvery(SAVE_SAILING, saveSailingData)
}

export function* watchRequestIslandData() {
  yield takeEvery(REQUEST_ISLAND_DATA, requestIslandData)
}

export function* watchSavingSailing() {
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
  ])
}