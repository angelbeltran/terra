import { put, select, take, call, all } from 'redux-saga/effects'
import {
  REVERT_STATE,
  COMMIT_STATE,
  REVERT_ACTION,
  // UNDO_STATE_DIFF,
  UNDO_STATE_DIFFS,
  REPLACE_HISTORY,
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


export function* historySaga(filter = {}, initialState = {}) {
  let prevState = initialState
  let history = []

  while (true) {
    const action = yield take()
    console.log('ACTION:', action)
    const type = action && action.type
    const state = yield select((s) => s)

    if (type === COMMIT_STATE) {
      history = []
    } else if (type === REVERT_ACTION) {
      // TODO: might be useful to just undo the action of one diff
      // yield put({ type: UNDO_STATE_DIFF, diff }) 
    } else if (type === REVERT_STATE) {
      const version = action.version

      if (version < history.length) {
        // undo the diffs enacted by the previous action(s)
        const diffs = history.slice(version).reverse().map(({ diffs }) => diffs)

        history = history.slice(0, version)
        yield put({ type: UNDO_STATE_DIFFS, diffs }) // if the store doesn't have the history reducer added in, this won't work
        yield put({ type: REPLACE_HISTORY, history: history.slice() })
      }
    } else {
      // compare the previous state and the next state in the areas of the state we are concerned about
      const filteredPrevState = filterObject(prevState, filter)
      const filteredState = filterObject(state, filter)
      const diffs = diff(filteredPrevState, filteredState)

      console.log('DIFFS:', diffs)
      // saved any diffs we found in the history
      if (diffs) {
        history.push({
          action,
          diffs,
        })
        yield put({ type: REPLACE_HISTORY, history })
      }
    }

    prevState = state
  }
}

export default function* bootUpSaga() {
  yield all([
  ].map(call))
}
