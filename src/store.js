import { createStore,  applyMiddleware } from 'redux'
import reducers from './reducers'
import createSagaMiddleware from 'redux-saga'

import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
    reducers, 
    { //  initial state
        sailing: {
            orientation: 0,
            position: {
                x: 0,
                y: 0
            },
            isSailing: false,
            callMap: false,
            isMapActive: false
        },
        island: {
            actualSnippetId: 1,
            haveAction: false,
            haveObject: false,
        }
    }, 
    applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

export default store