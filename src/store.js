import { applyMiddleware, createStore, compose } from 'redux'
import { autoRehydrate, persistStore } from 'redux-persist'
import { createLogger } from 'redux-logger'
import rootReducers from './rootReducer'
// Redux middleware that allows to pass functions to dispatch methods.
import thunk from 'redux-thunk'
// Redux middleware that allows to pass promises within the dispatch object.
import promiseMiddleware from 'redux-promise-middleware'
// Enables optimistic updates and dispatches pendling, fulfilled and rejected actions.
const middlewares = [promiseMiddleware(), thunk, /*createLogger()*/]

if (process.NODE_ENV === 'development') {
  middlewares.push(createLogger())
}

const enhancer = compose(
  applyMiddleware(...middlewares),
  autoRehydrate()
  // ,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const store = createStore(rootReducers, undefined, enhancer)
// persistStore(store)

export default store
