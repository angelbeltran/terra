import initialState from '../initial-state'
import {
  REVERT_STATE,
  COMMIT_TURN,
} from '../constants'

export default function historyReducer(state = initialState, action) {
  switch (action.type) {
    case REVERT_STATE:
      if (!(action.index > -1)) {
        throw new Error(`cannot revert history: invalid index: ${action.index}`)
      } else if (action.index >= state.history.length) {
        throw new Error(`cannot revert history: index too high: ${action.index} > ${state.history.length}`)
      }

      return {
        ...state.history[action.index].state,
      }

    case COMMIT_TURN:
      return {
        ...state,
        history: [],
      }

    default:
      return {
        ...state,
        history: [...state.history, { action, state }],
      }
  }
}
