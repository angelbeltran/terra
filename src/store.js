import { createStore } from 'redux'

/* game constants and configuration */
import { 
  MAX_VILLAGES,
  MAX_TRADE_POSTS,
  MAX_TEMPLES,
  MAX_STRONGHOLDS,
  MAX_SANCTUARIES,
  races,
} from './config'

const maxNumOfBuildings = {
  village: MAX_VILLAGES,
  tradePost: MAX_TRADE_POSTS,
  temple: MAX_TEMPLES,
  stronghold: MAX_STRONGHOLDS,
  sanctuary: MAX_SANCTUARIES,
}

/* action types */
const CLICK_SCORE_TRACK = 'CLICK_SCORE_TRACK'
const CLICK_BONUS_CARD = 'CLICK_BONUS_CARD'
const CLICK_POWER_BONUS = 'CLICK_POWER_BONUS'
const CLICK_GRID_SPACE = 'CLICK_GRID_SPACE'
const DROP_ON_GRID_SPACE = 'DROP_ON_GRID_SPACE'
const CHANGE_RACE = 'CHANGE_RACE'

/* action creators */
export function clickScoreTrack(score) {
  return {
    type: CLICK_SCORE_TRACK,
    score,
  }
}

export function clickBonusCard(num) {
  return {
    type: CLICK_BONUS_CARD,
    num,
  }
}

// TODO: rename this?
export function clickPowerBonus(num) {
  return {
    type: CLICK_POWER_BONUS,
    num,
  }
}

export function clickGridSpace(row, column) {
  return {
    type: CLICK_GRID_SPACE,
    row,
    column,
  }
}

export function dropOnGridSpace(row, column, { type, id }) {
  return {
    type: DROP_ON_GRID_SPACE,
    row,
    column,
    buildingType: type,
    id,
  }
}

export function changeRace(race) {
  return {
    type: CHANGE_RACE,
    race,
  }
}

/* app reducer */
const initialState = {
  // config
  races: races.slice(),

  // Game Board data

  bonusCards: {
    // these bools signify which bonus cards are displayed
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
  },
  powerBonuses: {
    // these bools signify which power bonuses are still available
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
  },
  buildingPlacement: {
    0: {
      // 0: 'village',
    },
    1: {
      // 0: 'tradePost',
    },
    2: {
      // 1: 'temple',
    },
    3: {
      // 1: 'stronghold',
    },
    4: {
      // 2: 'sanctuary',
    },
    5: {
      // 2: 'village',
    },
    6: {
      // 3: 'tradePost',
    },
    7: {
      // 3: 'temple',
    },
    8: {
      // 4: 'stronghold',
    },
  },

  // Player data
  race: races[Math.floor(Math.random() * races.length)],
  yourTurn: true,
  power: {
    1: 5,
    2: 7,
    3: 0,
  },
  villageCount: 8,
  tradePostCount: 4,
  templeCount: 3,
  strongholdCount: 1,
  strongholdActionTaken: false,
  sanctuaryCount: 1,
  shovelLevel: 1,
  shippingDistance: 0,
}

function rootReducer(state = initialState, action) {
  switch (action.type) {

    case CLICK_SCORE_TRACK:
      console.log(`score track clicked: ${action.score}`)
      return state

    case CLICK_BONUS_CARD:
      console.log(`bonus card clicked: ${action.num}`)
      return state

    case CLICK_POWER_BONUS:
      console.log(`power bonus clicked: ${action.num}`)
      return state

    case CLICK_GRID_SPACE:
      console.log(`grid spaced clicked: ${action.row} ${action.column}`)
      return state

    case DROP_ON_GRID_SPACE:
      console.log(`grid spaced dropped on: ${action.row} ${action.column} ${action.buildingType} ${action.id}`)
      // first, verify that player is able to drop the given building on the space
      const { buildingType, id } = action
      const buildingCountProp = `${buildingType}Count`

      if (state[buildingCountProp] + parseInt(id, 10) === maxNumOfBuildings[buildingType] &&
          !state.buildingPlacement[action.row][action.column]) {
        // decrement the appropriate building count, and mark the building placement
        return {
          ...state,
          [buildingCountProp]: state[buildingCountProp] - 1,
          buildingPlacement: {
            ...state.buildingPlacement,
            [action.row]: {
              ...state.buildingPlacement[action.row],
              [action.column]: action.buildingType,
            }
          }
        }
      }
      return state

    case CHANGE_RACE:
      console.log(`changing race to ${action.race}`)
      return {
        ...state,
        race: races.includes(action.race) ? console.log('yolo') || action.race : state.race,
      }

    default:
      return state
  }
}

/* store/state */
export default createStore(
  rootReducer
)
