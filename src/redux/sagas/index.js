import { delay } from 'redux-saga'
import { put, takeEvery, all } from 'redux-saga/effects'
import { SAVE_ISLAND_DATA } from '../actions/island'
import { REQUEST_STORE, populateStore } from '../actions/loading'
import { storeService } from '../../helpers/saveData'

export function* helloSaga() {
    console.log('Hello Sagas!')
}


// Our worker Saga: will perform the async increment task
export function* saveDataAsync(action) {
  const data = yield storeService.getSaving()

  // console.log(' ================ Saga ================ ')
  console.log('Saving data..')
  console.log('.');console.log('.');console.log('.');console.log('.');console.log('.');console.log('.');console.log('.');console.log('.')
  
  // If an island have been visited before 
  if (data.visitedIsland.length > 0) {
    
    let actualIslandSavedData = data.visitedIsland.find((island, index) => { if( island.id === action.state.currentIslandId) { return island }})
    
    // If this island have been visited before 
    if (actualIslandSavedData) {
      console.log('Already register island')
      console.log('.');console.log('.');console.log('.');console.log('.');console.log('.');

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

    // Else create a new island visited 
    } else {
      console.log('NewIsland')
      console.log('.');console.log('.');console.log('.');console.log('.');console.log('.');
      var newState = {
        ...data,
        visitedIsland: data.visitedIsland.concat({
          id: action.state.currentIslandId,
          screenReaded: [action.state.actualSnippetId],
          actualSnippetId: action.nextSnippetId,
          haveAction: false,
          haveObject: false,
        }),
      }
    }

  // Else create a new island visited 
  } else {
    var newState = {
      ...data,
      visitedIsland: data.visitedIsland.concat({
        id: action.state.currentIslandId,
        screenReaded: [action.state.actualSnippetId],
        actualSnippetId: action.nextSnippetId,
        haveAction: false,
        haveObject: false,
      }),
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



// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchSavingAsync() {
  yield takeEvery(SAVE_ISLAND_DATA, saveDataAsync)
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
    watchPopulateStore()
  ])
}