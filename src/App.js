import React, { Component } from 'react';
import './App.css';
import PlayerDash from './containers/PlayerDash'
// import alchemistsBoard from './img/alchemists.jpg'
import aurenBoard from './img/auren.jpg'
// import chaosMagiciansBoard from './img/chaos_magicians.jpg'
// import cultistsBoard from './img/cultists.jpg'
// import darklingsBoard from './img/darklings.jpg'
import dwarfsBoard from './img/dwarfs.jpg'
// import nomadBoard from './img/nomads.jpg'

import GameBoardContainer from './containers/GameBoardContainer'
import gameBoard from './img/board_1500_1011.jpg'


export default class App extends Component {
  render() {
    return (
      <div>
        <GameBoardContainer
          boardImg={gameBoard}
          name="Bob"
        />
        <PlayerDash
          boardImg={dwarfsBoard}
          name="Bob"
        />
        <PlayerDash
          boardImg={aurenBoard}
          name="Billy"
        />
      </div>
    )
  }
}
