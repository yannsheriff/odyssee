import { createStore } from 'redux'
import reducers from './reducers'
const store = createStore(reducers, { //  initial state
  sailing: {
    orientation: 0,
    position: {
        x: 0,
        y: 0
    },
    isSailing: false,
    callMap: false,
    isMapActive: false,
    destination: {
      id: '',
      x: '',
      y: ''
    }
  },
  island: {
    actualSnippetId: 1,
    haveAction: false,
    haveObject: false,
  }
})

export default store