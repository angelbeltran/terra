import initialState from '../initial-state'
import { 
  races,
  // actions
  CHANGE_RACE,
} from '../constants'

export default function rootReducer(state = initialState, action) {
  switch (action.type) {

    case CHANGE_RACE:
      console.log(`changing race to ${action.race}`)
      return {
        ...state,
        race: races.includes(action.race) ? action.race : state.race,
      }

    default:
      return state
  }
}
