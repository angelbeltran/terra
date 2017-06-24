import { put, select, take, call, all } from 'redux-saga/effects'
import {
  REVERT_STATE,
  COMMIT_STATE,
  // REVERT_ACTION,
  // UNDO_STATE_DIFF,
  UNDO_STATE_DIFFS,
  REPLACE_HISTORY,

  // actions filtered
  DROP_ON_GRID_SPACE,
  CLICK_POWER_BONUS,
} from './constants'


// returns the intersection of two arrays
function arrayIntersection(a, b) {
  const map = new Map()
  for (let i = 0; i < a.length; i += 1) {
    map.set(a[i], true)
  }

  const intersection = {}
  for (let i = 0; i < b.length; i += 1) {
    if (map.has(b[i])) {
      intersection[b[i]] = b[i]
    }
  }

  return Object.keys(intersection).map((key) => intersection[key])
}

// returns the set difference a - b
function arrayDifference(a, b) {
  const map = new Map()
  for (let i = 0; i < b.length; i += 1) {
    map.set(b[i], true)
  }

  const difference = {}
  for (let i = 0; i < a.length; i += 1) {
    if (!map.has(a[i])) {
      difference[a[i]] = a[i]
    }
  }

  return Object.keys(difference).map((key) => difference[key])
}

// returns an object, a, filtered by a filter tree, f
function filterObject(a, f) {
  return Object.keys(f).reduce((obj, key) => {
    if (typeof f[key] === 'object') {
      if (typeof a[key] === 'object' && a[key]) {
        obj[key] = filterObject(a[key], f[key])
      } else {
        obj[key] = a[key]
      }
    } else if (f[key] === true) {
      obj[key] = a[key]
    } else {
      console.error('filter should only have true as values')
    }
    return obj
  }, {})
}

function diff(a, b) {
  if (a === b) {
    return
  }
  if (typeof a !== typeof b) {
    return {
      removed: a,
      added: b
    }
  }
  if (typeof a !== 'object') {
    if (a !== b) {
      return {
        removed: a,
        added: b,
      }
    } else {
      return
    }
  }

  const aKeys = Object.keys(a)
  const bKeys = Object.keys(b)

  const commonKeys = arrayIntersection(aKeys, bKeys)
  const missingKeys = arrayDifference(aKeys, commonKeys)
  const newKeys = arrayDifference(bKeys, commonKeys)

  const result = {}

  if (missingKeys.length) {
    result.removed = missingKeys.reduce((obj, key) => {
      obj[key] = a[key]
      return obj
    }, {})
  }
  if (newKeys.length) {
    result.added = newKeys.reduce((obj, key) => {
      obj[key] = b[key]
      return obj
    }, {})
  }
  if (commonKeys.length) {
    const changed = commonKeys.reduce((obj, key) => {
      const result = diff(a[key], b[key])

      if (result) {
        obj[key] = result
      }
      return obj
    }, {})

    if (Object.keys(changed).length) {
      result.changed = changed
    }
  }

  if (Object.keys(result).length) {
    return result
  }
}


export function* actionTracking(filter = {}) {
  let history = []
  let prevState = yield select((s) => s)

  while (true) {
    // look for a game action or action to commit/undo their turn
    const action = yield take()
    const type = action && action.type
    const state = yield select((s) => s)
    let undoable = false
    let filteredPrevState//  = filterObject(prevState, filter)
    let filteredState// = filterObject(state, filter)
    let diffs// = diff(filteredPrevState, filteredState)

    /* eslint-disable no-fallthrough*/
    switch (type) {
      case REVERT_STATE:
        // if they want to undo their action(s), revert the state and history back.
        const version = action.version

        if (version < history.length) {
          // undo the undoable diffs enacted by the previous action(s)
          const historyToBeReverted = history.slice(version)

          history = history.slice(0, version).concat(
            historyToBeReverted.filter((obj) => !obj.undoable)
          )
          // if the store doesn't have the history reducer added in, this won't work
          yield put({
            type: UNDO_STATE_DIFFS,
            diffs: historyToBeReverted
              .filter((obj) => obj.undoable)
              .reverse()
              .map(({ diffs }) => diffs)
          })
          yield put({ type: REPLACE_HISTORY, history })
        }
        break

      case COMMIT_STATE:
        // if they want to commit their turn, set the history as new for the next turn.
        history = []
        yield put({ type: REPLACE_HISTORY, history })
        break

      case DROP_ON_GRID_SPACE:
      case CLICK_POWER_BONUS:
        // if a action we're watching for occurs, add it and it's diff to the history,
        // marking it as undoable in case they want to undo it.
        undoable = true

      default:
        // if an action we're not watching for happens, add it track it's diff,
        // so we can know what truly is from the actions we care about.
        filteredPrevState = filterObject(prevState, filter)
        filteredState = filterObject(state, filter)
        diffs = diff(filteredPrevState, filteredState)

        // saved any diffs we found in the history
        if (diffs) {
          history.push({
            undoable,
            action,
            diffs,
          })
          yield put({ type: REPLACE_HISTORY, history })
        }
    }
    /* eslint-enable no-fallthrough*/

    prevState = state
  }
}

export default function* bootUpSaga() {
  yield all([
  ].map(call))
}
