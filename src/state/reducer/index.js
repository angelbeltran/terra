import board from './board'
import general from './general'
import player from './player'


const composeReducers = (...r) => r.reduce((f, g) => (s, a) => f(g(s, a), a), (s) => s)

export default composeReducers(
  general,
  board,
  player,
)
