import initialState from '../initial-state'
import { 
  ACTION,
} from '../constants'

export default function rootReducer(state = initialState, action) {
  switch (action.type) {

    case START_GAME:
      if (!state.race) {
        return state
      }
      console.log('player values initialized')
      return {
        ...state,
        ...startingValues[state.race],
      }

    case CHANGE_RACE:
      if (action.race && races.includes(action.race)) {
        console.log(`changing race to ${action.race}`)
        return {
          ...state,
          race: action.race
        }
      } else if (!action.race) {
        console.log('cannot change race: no race provided')
      } else {
        console.log(`cannot change race: unrecognized race: ${action.race}`)
      }
      return state

    default:
      return state
  }
}
