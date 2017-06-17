import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as actions from '../store'
import PlayerBoard from '../components/PlayerBoard'
// import nomadBoard from '../img/nomads_620_399.jpg'
// import witchesBoard from '../img/witches_460_296.jpg'

// TODO: most of the methods in this class are useless.
// delete/replace them when possible.

class PlayerDash extends Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    name: PropTypes.string.isRequired,
  }

  static defaultProps = {
    className: '',
    style: {},
    name: '',
  }

  constructor(props) {
    super(props)

    this.state = {
      yourTurn: true,
      power: {
        1: 5,
        2: 7,
        3: 0,
      },
      villages: 8,
      tradePosts: 4,
      temples: 3,
      strongholds: 1,
      strongholdActionTaken: false,
      sanctuaries: 1,
      shovelLevel: 1,
      shippingDistance: 0,
    }
  }

  incrementPower = (n = 1) => {
    let m = n
    let powerState = { ...this.state.power }

    while (m > 0 && powerState[1]) {
      powerState[1] -= 1
      powerState[2] += 1
    }
    while (m > 0 && powerState[2]) {
      powerState[2] -= 1
      powerState[3] += 1
    }

    this.setState({
      power: {
        ...powerState,
        ...this.state.power,
      }
    })
  }

  handlePowerBowlClick = (id) => {
    // DEV
    if (this.state.power[id]) {
      const from = parseInt(id, 10)
      const to = (from % 3) + 1

      this.setState({
        power: {
          [from]: this.state.power[from] - 1,
          [to]: this.state.power[to] + 1,
          ...this.state.power,
        },
      }, () => console.log(`POWER: ${this.state.power}`))
    }
  }

  incrementVillages = (n = 1) => {
    let m = this.state.villages + n

    if (m > 8) {
      m = 8
    }

    this.setState({
      villages: m,
    })
  }

  handleVillageDepotClick = (id) => {
    // DEV
    if (parseInt(id, 10) + this.state.villages === 9) {
      this.setState({
        villages: this.state.villages - 1,
      }, () => console.log(`VILLAGES: ${this.state.villages}`))
    }
  }

  incrementTradePosts = (n = 1) => {
    let m = this.state.tradePosts + n

    if (m > 4) {
      m = 4
    }

    this.setState({
      tradePosts: m,
    })
  }

  handleTradePostDepotClick = (id) => {
    // DEV
    if (parseInt(id, 10) + this.state.tradePosts === 5) {
      this.setState({
        tradePosts: this.state.tradePosts - 1,
      }, () => console.log(`TRADEPOSTS: ${this.state.tradePosts}`))
    }
  }

  handleTempleDepotClick = (id) => {
    // DEV
    if (parseInt(id, 10) + this.state.temples === 4) {
      this.setState({
        temples: this.state.temples - 1,
      }, () => console.log(`TEMPLES: ${this.state.temples}`))
    }
  }

  handleStrongholdDepotClick = () => {
    // DEV
    if (this.state.strongholds === 1) {
      this.setState({
        strongholds: this.state.strongholds - 1,
      }, () => console.log(`STRONGHOLDS: ${this.state.strongholds}`))
    }
  }

  handleStrongholdActionClick = () => {
    // DEV
    if (!this.state.strongholdActionTaken) {
      this.setState({
        strongholdActionTaken: false
      }, () => console.log(`STRONGHOLD ACTION`))
    }
  }

  handleSanctuaryDepotClick = () => {
    // DEV
    if (this.state.sanctuaries === 1) {
      this.setState({
        sanctuaries: this.state.sanctuaries - 1,
      }, () => console.log(`SANCTUARIES: ${this.state.sanctuaries}`))
    }
  }

  handleShovelTrackClick = (id) => {
    if (parseInt(id, 10) - this.state.shovelLevel === 1) {
      this.setState({
        shovelLevel: this.state.shovelLevel + 1,
      }, () => console.log(`SHOVEL TRACK: ${this.state.shovelLevel}`))
    }
  }

  handleShippingTrackClick = (distance) => {
    console.log(`SHIPPING DISTANCE #${distance}`)
    if (parseInt(distance, 10) - this.state.shippingDistance === 1) {
      this.setState({
        shippingDistance: this.state.shippingDistance + 1
      }, () => console.log(`SHIPPING DISTANCE: ${this.state.shippingDistance}`))
    }
  }

  render() {
    return (
      <div
        className={`card ${this.props.className}`}
        style={{
          ...this.props.style,
        }}
      >
        <div className="card-header">
          <div className="row">
            <div className="col-4">
              <h3>Player Card</h3>
            </div>
            <div className="col-8 d-flex justify-content-end">
              <select
                onChange={(e) => this.props.changeRace(e.target.value)}
              >
                <option value="">select a race</option>
                {this.props.races.map((race) => (
                  <option key={race} value={race}>{race}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="card-body">
          <PlayerBoard
            race={this.props.race}

            villageCount={this.props.villageCount}
            tradePostCount={this.props.tradePostCount}
            templeCount={this.props.templeCount}
            strongholdCount={this.props.strongholdCount}
            sanctuaryCount={this.props.sanctuaryCount}

            yourTurn={this.state.yourTurn}
            onPowerBowlClick={this.handlePowerBowlClick}
            onVillageDepotClick={this.handleVillageDepotClick}
            onTradePostDepotClick={this.handleTradePostDepotClick}
            onTempleDepotClick={this.handleTempleDepotClick}
            onStrongholdDepotClick={this.handleStrongholdDepotClick}
            onStrongholdActionClick={this.handleStrongholdActionClick}
            onSanctuaryDepotClick={this.handleSanctuaryDepotClick}
            onShovelTrackClick={this.handleShovelTrackClick}
            onShippingTrackClick={this.handleShippingTrackClick}
          />
        </div>
        <div className="card-footer">
          Footer
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ ...state })
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PlayerDash)
