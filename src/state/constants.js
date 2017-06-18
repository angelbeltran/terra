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

/* action types */
export const CLICK_SCORE_TRACK = 'CLICK_SCORE_TRACK'
export const CLICK_BONUS_CARD = 'CLICK_BONUS_CARD'
export const CLICK_POWER_BONUS = 'CLICK_POWER_BONUS'
export const CLICK_GRID_SPACE = 'CLICK_GRID_SPACE'
export const DROP_ON_GRID_SPACE = 'DROP_ON_GRID_SPACE'
export const CHANGE_RACE = 'CHANGE_RACE'
export const START_GAME = 'START_GAME'
