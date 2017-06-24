/* game constants and configuration */
import { 
  MAX_VILLAGES,
  MAX_TRADE_POSTS,
  MAX_TEMPLES,
  MAX_STRONGHOLDS,
  MAX_SANCTUARIES,
  startingValues,
  races,
} from '../config'

export { MAX_VILLAGES } 
export { MAX_TRADE_POSTS } 
export { MAX_TEMPLES } 
export { MAX_STRONGHOLDS } 
export { MAX_SANCTUARIES } 
export { startingValues } 
export { races }

export const maxNumOfBuildings = {
  village: MAX_VILLAGES,
  tradePost: MAX_TRADE_POSTS,
  temple: MAX_TEMPLES,
  stronghold: MAX_STRONGHOLDS,
  sanctuary: MAX_SANCTUARIES,
}

/* ACTION TYPES */
/* general */
export const START_GAME = 'START_GAME'

/* player */
export const CHANGE_RACE = 'CHANGE_RACE'

/* board */
export const DROP_ON_GRID_SPACE = 'DROP_ON_GRID_SPACE'
export const CLICK_SCORE_TRACK = 'CLICK_SCORE_TRACK'
export const CLICK_BONUS_CARD = 'CLICK_BONUS_CARD'
export const CLICK_POWER_BONUS = 'CLICK_POWER_BONUS'
export const CLICK_GRID_SPACE = 'CLICK_GRID_SPACE'

/* turn */
export const ADD_TO_TURN = 'ADD_TO_TURN'
export const COMMIT_TURN = 'COMMIT_TURN'

/* history */
export const COMMIT_STATE = 'COMMIT_STATE'
export const REVERT_STATE = 'REVERT_STATE'
export const REVERT_ACTION = 'REVERT_ACTION'
export const UNDO_STATE_DIFF = 'UNDO_STATE_DIFF' // for a single diff
export const UNDO_STATE_DIFFS = 'UNDO_STATE_DIFFS' // for a sequence of diffs
export const REPLACE_HISTORY = 'REPLACE_HISTORY'
