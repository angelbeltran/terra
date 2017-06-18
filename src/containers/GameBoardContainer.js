import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../store'
import GameBoard from '../components/GameBoard'
// import nomadBoard from '../img/nomads_620_399.jpg'
// import witchesBoard from '../img/witches_460_296.jpg'


class GameBoardContainer extends Component {
  render() {
    return (
      <GameBoard
        buildingPlacement={this.props.buildingPlacement}
        onGridDrop={this.props.dropOnGridSpace}
        onTrackClick={this.props.clickScoreTrack}
        onBonusCardClick={this.props.clickBonusCard}
        powerBonuses={this.props.powerBonuses}
        onGridClick={this.props.clickGridSpace}
        onPowerBonusClick={this.props.clickPowerBonus}
        scores={{
          1: ['blue'],
          10: ['blue'],
          17: ['red', 'blue', 'gray'],
          18: ['red', 'gray'],
          19: ['red', 'gray'],
          20: ['red', 'gray'],
          21: ['red', 'gray'],
          22: ['red', 'gray'],
          23: ['red', 'gray'],
          26: ['red', 'gray'],
          45: ['green'],
          65: ['black'],
          85: ['brown', 'yellow'],
        }}
      />
    )
  }
}

const mapStateToProps = (state) => ({ ...state })
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(GameBoardContainer)
