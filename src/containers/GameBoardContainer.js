import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../store'
import GameBoard from '../components/GameBoard'
// import nomadBoard from '../img/nomads_620_399.jpg'
// import witchesBoard from '../img/witches_460_296.jpg'


class GameBoardContainer extends Component {
  static propTypes = {
    boardImg: PropTypes.string.isRequired,
  }

  render() {
    return (
      <div>
        <GameBoard
          boardImg={this.props.boardImg}
          buildingPlacement={this.props.buildingPlacement}
          onGridDrop={this.props.dropOnGridSpace}
          onTrackClick={this.props.clickScoreTrack}
          onBonusCardClick={this.props.clickBonusCard}
          onGridClick={this.props.clickGridSpace}
          onPowerBonusClick={this.props.clickPowerBonus}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ ...state })
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(GameBoardContainer)
