import React, { Component } from 'react';
import PropTypes from 'prop-types'
import GameBoard from '../components/GameBoard'
// import nomadBoard from '../img/nomads_620_399.jpg'
// import witchesBoard from '../img/witches_460_296.jpg'


export default class GameBoardContainer extends Component {
  static propTypes = {
    boardImg: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
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
      }
    }
  }

  handleTrackClick = (i) => {
    // TODO
    console.log(`score track: ${i}`)
  }

  handleBonusCardClick = (i) => {
    // TODO
    console.log(`bonus card: ${i}`)
  }

  handlePowerBonusClick = (i) => {
    console.log(`power bonus: ${i}`)
    if (this.state.powerBonuses[i]) {
      // TODO: provide the power bonus to the player
      this.setState({
        powerBonuses: {
          ...this.state.powerBonuses,
          [i]: false,
        }
      })
    }
  }

  handleGridClick = (row, column) => {
    // TODO
    console.log(`row: ${row}, column: ${column}`)
  }

  render() {
    return (
      <div>
        <GameBoard
          boardImg={this.props.boardImg}
          onTrackClick={this.handleTrackClick}
          onBonusCardClick={this.handleBonusCardClick}
          onGridClick={this.handleGridClick}
          onPowerBonusClick={this.handlePowerBonusClick}
        />
      </div>
    );
  }
}
