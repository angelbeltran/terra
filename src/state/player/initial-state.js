import { races } from '../constants'

export default {
  // Player data
  race: races[Math.floor(Math.random() * races.length)],
  yourTurn: true,

  // resources
  workers: 0,
  gold: 0,
  priests: 0,
  power: [0, 0, 0],

  // remaining buildings & priests
  villageCount: 8,
  tradePostCount: 4,
  templeCount: 3,
  strongholdCount: 1,
  sanctuaryCount: 1,
  priestCount: 7,

  // ability levels
  shovelLevel: 1,
  shippingDistance: 0,

  // stronghold action avilability
  strongholdActionTaken: false,
}
