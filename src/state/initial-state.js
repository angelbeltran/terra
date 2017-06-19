import general from './general/initial-state'
import board from './board/initial-state'
import player from './player/initial-state'
import cultTrack from './cult-track/initial-state'
import history from './history/initial-state'

export default {
  ...general,
  ...board,
  ...player,
  ...cultTrack,
  ...history,
}
