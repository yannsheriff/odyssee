import { createStore,  applyMiddleware, combineReducers, compose } from 'redux'
import reducers from './reducers'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';


const sagaMiddleware = createSagaMiddleware()
const navigationMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);

const store = createStore(
    reducers,
    {},
    applyMiddleware(sagaMiddleware),
    applyMiddleware(navigationMiddleware),
  );

sagaMiddleware.run(rootSaga)



export default store