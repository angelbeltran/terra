/* game constants and configuration */
import { races } from '../config'

export default {
  // config
  races: races.slice(),

  // general data
  gameStarted: false,

  // Game Board data
  bonusCards: {
    // these bools signify which bonus cards are displayed
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
  },
  powerBonuses: {
    // these bools signify which power bonuses are still available
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
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
  workers: 0,
  gold: 0,
  priests: 0,
  power: [0, 0, 0],
  villageCount: 8,
  tradePostCount: 4,
  templeCount: 3,
  strongholdCount: 1,
  sanctuaryCount: 1,
  priestCount: 7,
  shovelLevel: 1,
  shippingDistance: 0,
  strongholdActionTaken: false,
}
