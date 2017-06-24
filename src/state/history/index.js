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

export const COMMIT_STATE = '@@COMMIT_STATE@@'
export const REVERT_STATE = '@@REVERT_STATE@@'
export const REVERT_ACTION = '@@REVERT_ACTION@@'
export const UNDO_STATE_DIFF = '@@UNDO_STATE_DIFF@@' // for a single diff
export const UNDO_STATE_DIFFS = '@@UNDO_STATE_DIFFS@@' // for a sequence of diffs
export const REPLACE_HISTORY = '@@REPLACE_HISTORY@@'

/**
 * filter is a objects whos values, including nested, are bools,
 * representing the parts of the state we care about taking history of.
 */
// TODO: see if this whole module can be compacted into a reducer
export default function createHistory(filter = {}, initialState = {}) {
  let history = []

  function historyMiddleware({ getState, dispatch }) {
    return (next) => (action) => {
      const type = action && action.type
      const prevState = getState()
      let result = next(action)
      const state = getState()

      if (type === COMMIT_STATE) {
        history = []
      } else if (type === REVERT_ACTION) {
        // TODO: might be useful to just undo the action of one diff
        // next({ type: UNDO_STATE_DIFF, diff }) 
      } else if (type === REVERT_STATE) {
        const version = action.version

        if (version < history.length) {
          // undo the diffs enacted by the previous action(s)
          const diffs = history.slice(version).reverse().map(({ diffs }) => diffs)

          history = history.slice(0, version)
          next({ type: UNDO_STATE_DIFFS, diffs }) // if the store doesn't have the history reducer added in, this won't work
          next({ type: REPLACE_HISTORY, history })
        }
      } else {
        // compare the previous state and the next state in the areas of the state we are concerned about
        const filteredPrevState = filterObject(prevState, filter)
        const filteredState = filterObject(state, filter)
        const diffs = diff(filteredPrevState, filteredState)

        // saved any diffs we found in the history
        if (diffs) {
          history.push({
            action,
            diffs,
          })
          next({ type: REPLACE_HISTORY, history })
        }
      }

      return result
    }
  }

  function historyReducer(state = initialState, action) {
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

  return {
    historyMiddleware,
    historyReducer,
  }
}
