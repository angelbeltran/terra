import general, { filter as generalFilter } from './general/initial-state'
import board, { filter as boardFilter } from './board/initial-state'
import player, { filter as playerFilter } from './player/initial-state'
import cultTrack, { filter as cultTrackFilter } from './cult-track/initial-state'
import history from './history/initial-state'

export default {
  ...general,
  ...board,
  ...player,
  ...cultTrack,
  ...history,
}

export const filter = {
  ...generalFilter,
  ...boardFilter,
  ...playerFilter,
  ...cultTrackFilter,
}
