import initialState from '../initial-state'
import {
  UNDO_STATE_DIFFS,
  REPLACE_HISTORY,
} from '../constants'


function undoDiff(value, { removed, added, changed }) {
  // add the removed parts
  if (removed !== undefined) {
    // if the new or previous values weren't objects, then it was jus a swap
    if (typeof value !== 'object' || value === null ||
        typeof removed !== 'object' || removed === null) {
      return removed
    }
  }

  const newValue = {
    ...value,
    ...removed,
  }

  // remove the added parts
  if (added !== undefined) {
    Object.keys(added).forEach((key) => { delete newValue[key] })
  }

  // repeat on the "changed" parts
  if (changed) {
    Object.keys(changed).forEach((key) => {
      newValue[key] = undoDiff(newValue[key], changed[key])
    })
  }

  return newValue
}

export default function historyReducer(state = initialState, action) {
  if (action.type === UNDO_STATE_DIFFS) {
    // remove added state and add removed state
    return (action.diffs && action.diffs.reduce(undoDiff, state)) || state
  } else if (action.type === REPLACE_HISTORY) {
    return {
      ...state,
      stateHistory: action.history,
    }
  }
  return state
}
