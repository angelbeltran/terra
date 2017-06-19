import initialState from '../initial-state'
import { 
  startingValues,
  // actions
  START_GAME,
} from '../constants'

export default function rootReducer(state = initialState, action) {
  switch (action.type) {

    case START_GAME:
      if (!state.race) {
        return state
      }
      console.log('game started')
      return {
        ...state,
        gameStarted: true,
        ...startingValues[state.race],
      }

    default:
      return state
  }
}
