/* action types (imported) */
import {
  CHANGE_RACE,
  START_GAME,
  DROP_ON_GRID_SPACE,
  CLICK_SCORE_TRACK,
  CLICK_BONUS_CARD,
  CLICK_POWER_BONUS,
  CLICK_GRID_SPACE,
  REVERT_STATE,
  COMMIT_TURN,
} from './constants'

/* action creators */
export function changeRace(race) {
  return {
    type: CHANGE_RACE,
    race,
  }
}

export function startGame() {
  return {
    type: START_GAME,
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

// TODO: UNUSED/UNAPPLIED HANDLERS
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

export function commitTurn() {
  return {
    type: COMMIT_TURN,
  }
}

// for partial history reversion
export function revertState(version) {
  return {
    type: REVERT_STATE,
    version,
  }
}
