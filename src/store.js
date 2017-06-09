import { createStore } from 'redux'

/* action types */
const TEST_ACTION = 'TEST_ACTION'

/* action creators */
export testAction() {
  type: TEST_ACTION,
}

/* app reducer */
const initialState = {}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case TEST_ACTION:
      console.log('Testing!')
      return state
    default:
      return state
  }
}

/* store/state */
export default createStore(
  rootReducer
)
