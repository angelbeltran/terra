import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import generalReducer from './general/reducer'
import boardReducer from './board/reducer'
import playerReducer from './player/reducer'
import cultTrackReducer from './cult-track/reducer'
import historyReducer from './history/reducer'
import initialState, { filter as historyFilter } from './initial-state'
import bootUpSaga, { historySaga } from './sagas'


const composeReducers = (...r) => r.reduceRight((f, g) => (s, a) => f(g(s, a), a), (s) => s)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const sagaMiddleware = createSagaMiddleware()

export default createStore(
  composeReducers(
    historyReducer, // for partial history reverting
    generalReducer,
    boardReducer,
    playerReducer,
    cultTrackReducer,
  ),
  composeEnhancers(
    applyMiddleware(
      sagaMiddleware,
    )
  ),
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

sagaMiddleware.run(bootUpSaga)
sagaMiddleware.run(historySaga, historyFilter, initialState)
