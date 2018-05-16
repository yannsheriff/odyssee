import { createStore,  applyMiddleware, combineReducers, compose } from 'redux'
import reducers from './reducers'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'


const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    reducers,
    {},
    applyMiddleware(sagaMiddleware),
  );

sagaMiddleware.run(rootSaga)



export default store