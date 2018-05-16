import { delay } from 'redux-saga'
import { put, takeEvery, all } from 'redux-saga/effects'
import { SAVE_ISLAND_DATA } from './actions/island'
import { storeService } from './helpers/saveData'

export function* helloSaga() {
    console.log('Hello Sagas!')
}


// Our worker Saga: will perform the async increment task
export function* saveDataAsync(action) {
  const data = yield storeService.getSaving()

  // yield put({ type: 'INCREMENT' })
  
  // If an island have been visited before 
  if (data.visitedIsland.length > 0) {

    let actualIslandSavedDate = data.visitedIsland.find((island, index) => { if( island.id === action.state.currentIslandId) { return island }})

    console.log('Saving data..')
    console.log('.');console.log('.');console.log('.');console.log('.');console.log('.');console.log('.');console.log('.');console.log('.')

    // Create a new occurence of visited island
    let newActualIslandState = {
      ...actualIslandSavedDate,
      screenReaded: actualIslandSavedDate.screenReaded.concat(action.state.actualSnippetId),
      actualSnippetId: action.nextSnippetId,
    }

    // Create a new occurence of the saved state
    let newState = {
      ...data,
      visitedIsland: data.visitedIsland.map((island) => {
        if (island.id === action.state.currentIslandId) {
          return newActualIslandState
        }
      })
    }
    
    // Save data to Async storage
    console.log('state : ', newState.visitedIsland[0].screenReaded)
    yield storeService.save(newState)
    console.log('Saved ✅')

  // Else create a new island visited 
  } else {
    // {
    //   id: 1,
    //   screenReaded: [],
    //   actualSnippetId: 1,
    //   haveAction: false,
    //   haveObject: false,
    // }
  }
  
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchSavingAsync() {
  yield takeEvery(SAVE_ISLAND_DATA, saveDataAsync)
}


// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchSavingAsync()
  ])
}