import { createStore } from 'redux'
// import rootReducer from './reducer'
import generalReducer from './general/reducer'
import boardReducer from './board/reducer'
import playerReducer from './player/reducer'
import cultTrackReducer from './cult-track/reducer'
import historyReducer from './history/reducer'


const composeReducers = (...r) => r.reduceRight((f, g) => (s, a) => f(g(s, a), a), (s) => s)

export default createStore(
  composeReducers(
    historyReducer, // this has to be the first reducer hit. it keeps a track of the state history for reverting purposes.
    generalReducer,
    boardReducer,
    playerReducer,
    cultTrackReducer,
  ),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)
