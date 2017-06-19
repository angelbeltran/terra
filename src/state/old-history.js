/*
 * A redux middlerware that keeps a history of actions
 * for the purposed of reverting to a previous state.
 */

/*
 * A redux middleware is a functions that conforms to the Redux middleware API.
 * A middleware receives Store's dispatch and getState functions as named arguments,
 * and returns a function. That function will be given the next middleware's dispatch
 * method, and is expected to return a function of action calling next(action) with a
 * potentially different argument, or at a different time, or maybe not calling it at all.
 * The last middleware in the chain will receive the real store's dispatch method as
 * the next parameter, thus ending the chain. So, the middleware signature is
 * ({ getState, dispatch }) => next => action.
 */

function historyMiddleware({ dispatch, getState }) {
  return (next) => (action) => {
    
    history.set(action, 
    return next(action)
  }
}

function historyReducer(state = {}, action) {
  if (!state.history) {
    return state.history = []
  }

  return {
    ...state
    history: [ ...state.history, { action, state } ],
  }
}
