import { delay } from 'redux-saga'
import { put, takeEvery, all } from 'redux-saga/effects'
import { NEXT_SNIPPET } from './actions/island'


export function* helloSaga() {
    console.log('Hello Sagas!')
}


// Our worker Saga: will perform the async increment task
export function* saveDataAsync(action) {
  yield delay(1000)
  // yield put({ type: 'INCREMENT' })
  console.log('Hello ! ', action)
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchSavingAsync() {
  yield takeEvery(NEXT_SNIPPET, saveDataAsync)
}


// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchSavingAsync()
  ])
}