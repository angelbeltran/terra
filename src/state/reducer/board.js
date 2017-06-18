import initialState from '../initial-state'
import { 
  maxNumOfBuildings,
  // actions
  DROP_ON_GRID_SPACE,
} from '../constants'

export default function rootReducer(state = initialState, action) {
  switch (action.type) {

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

    default:
      return state
  }
}
