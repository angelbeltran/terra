import React, { Component } from 'react';
import PropTypes from 'prop-types'

import pillImg from '../img/pill.png'
import workerImg from '../img/worker.png'
import villageImg from '../img/village_black.png'
import tradePostImg from '../img/tradepost_black.png'
import templeImg from '../img/temple_black.png'
import strongholdImg from '../img/stronghold_black.png'
import sanctuaryImg from '../img/sanctuary_black.png'

// TODO: replace tradepost with tradePost

// nomad board: 620 x 399
export default class PlayerBoard extends Component {
  static propTypes = {
    villageCount: PropTypes.number.isRequired,
    tradePostCount: PropTypes.number.isRequired,
    templeCount: PropTypes.number.isRequired,
    strongholdCount: PropTypes.number.isRequired,
    sanctuaryCount: PropTypes.number.isRequired,

    yourTurn: PropTypes.bool.isRequired,

    onPowerBowlClick: PropTypes.func.isRequired,
    onVillageDepotClick: PropTypes.func.isRequired,
    onTradepostDepotClick: PropTypes.func.isRequired,
    onTempleDepotClick: PropTypes.func.isRequired,
    onStrongholdDepotClick: PropTypes.func.isRequired,
    onStrongholdActionClick: PropTypes.func.isRequired,
    onSanctuaryDepotClick: PropTypes.func.isRequired,
    onShovelTrackClick: PropTypes.func.isRequired,
    onShippingTrackClick: PropTypes.func.isRequired,
  }

  static TOP_RATIO = 52
  static BOTTOM_RATIO = 100 - PlayerBoard.TOP_RATIO
  static POWER_BOWL_RATIO = 48
  static TERRAFORM_RATIO = 100 - PlayerBoard.POWER_BOWL_RATIO
  static BUILDINGS_RATIO = 68
  static SHIPPING_AND_ABILITY_RATIO = 100 - PlayerBoard.BUILDINGS_RATIO

  static BOARD_STYLE = {
    // backgroundImage: `url(${nomadBoard})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    position: 'relative',
    height: 0,
    paddingTop: ((399 / 620) * 100) + '%', // '64.354838709%'
  }

  static BODY_STYLE = {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }

  static TOP_STYLE = {
    height: `${PlayerBoard.TOP_RATIO}%`,
    display: 'flex',
    alignItems: 'stretch',
  }

  static BOTTOM_STYLE = {
    height: `${PlayerBoard.BOTTOM_RATIO}%`,
    display: 'flex',
    alignItems: 'stretch',
  }

  handlePowerBowlClick = (id) => {
    this.props.onPowerBowlClick(id)
  }

  handleVillageDepotClick = (id) => {
    this.props.onVillageDepotClick(id)
  }

  handleTradePostDepotClick = (id) => {
    this.props.onTradepostDepotClick(id)
  }

  handleTempleDepotClick = (id) => {
    this.props.onTempleDepotClick(id)
  }

  handleStrongholdDepotClick = () => {
    this.props.onStrongholdDepotClick()
  }

  handleStrongholdActionClick = () => {
    this.props.onStrongholdActionClick()
  }

  handleSanctuaryDepotClick = () => {
    this.props.onSanctuaryDepotClick()
  }

  handleShovelTrackClick = (id) => {
    this.props.onShovelTrackClick(id)
  }

  handleShippingTrackClick = (distance) => {
    this.props.onShippingTrackClick(parseInt(distance, 10))
  }

  render() {
    const boardStyle = {
      ...PlayerBoard.BOARD_STYLE,
      backgroundImage: `url(${this.props.boardImg})`,
    }

    return (
      <div style={boardStyle}>
        <div style={PlayerBoard.BODY_STYLE}>
          {/* Top part of board */}
          <div style={PlayerBoard.TOP_STYLE}>
            {/* Power bowls */}
            <div style={{ width: `${PlayerBoard.POWER_BOWL_RATIO}%`, display: 'flex' }}>
              <div style={{ width: '7%' }}>
              </div>

              <div style={{ width: '87%' }}>
                <div style={{ height: '7%' }}>
                </div>

                {/* Inner div that contains the bowls */}
                <div style={{ height: '85%' }}>
                  <PowerBowls onClick={this.handlePowerBowlClick} />
                </div>

                <div style={{ height: '8%' }}>
                </div>
              </div>

              <div style={{ width: '6%' }}>
              </div>
            </div>
            {/* Terraforming */}
            <div style={{ width: `${PlayerBoard.TERRAFORM_RATIO}%`, display: 'flex' }}>
              <div style={{ width: '63%' }}>
              </div>
              <div style={{ width: '28%' }}>
                <div style={{ height: '34%' }}>
                </div>
                <div style={{ height: '47%' }}>
                  <ShovelTrack
                    level={1}
                    onClick={this.handleShovelTrackClick}
                  />
                </div>
                <div style={{ height: '19%' }}>
                </div>
              </div>
              <div style={{ width: '9%' }}>
              </div>
            </div>
          </div>

          {/* Bottom part of board */}
          <div style={PlayerBoard.BOTTOM_STYLE}>
            {/* Buildings */}
            <div style={{ width: `${PlayerBoard.BUILDINGS_RATIO}%`, display: 'flex', alignItems: 'flex-stretch' }}>
              <div style={{ width: '14.5%' }}>
              </div>
              <div style={{ width: '76%' }}>
                <div style={{ height: '90%' }}>
                  <div style={{ width: '100%', height: '100%' }}>
                    <BuildingDepot
                      villageCount={this.props.villageCount}
                      tradePostCount={this.props.tradePostCount}
                      templeCount={this.props.templeCount}
                      strongholdCount={this.props.strongholdCount}
                      sanctuaryCount={this.props.sanctuaryCount}
                      onVillageDepotClick={this.handleVillageDepotClick}
                      onTradepostDepotClick={this.handleTradePostDepotClick}
                      onTempleDepotClick={this.handleTempleDepotClick}
                      onStrongholdDepotClick={this.handleStrongholdDepotClick}
                      onStrongholdActionClick={this.handleStrongholdActionClick}
                      onSanctuaryDepotClick={this.handleSanctuaryDepotClick}
                    />
                  </div>
                </div>
              </div>
              <div style={{ width: '9.5%' }}>
              </div>
            </div>
            {/* Shipping & abilities */}
            <div style={{ display: 'flex', width: `${PlayerBoard.SHIPPING_AND_ABILITY_RATIO}%` }}>
              <div style={{ width: '26%' }}>
              </div>
              <div style={{ width: '56%' }}>
                <div style={{ height: '8.5%' }}>
                </div>
                <div style={{ height: '29%' }}>
                  <ShippingTrack onClick={this.handleShippingTrackClick} />
                </div>
              </div>
              <div style={{ width: '18%' }}>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class PowerBowls extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  }

  handleClick = (e) => {
    this.props.onClick(e.target.id)
  }

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div style={{ display: 'inline-block', width: '50%', height: '100%' }}>
          {/* Power bowl 2 */}
          <div style={{ height: '50%' }}>
            <div id="2" onClick={this.handleClick} style={{ width: '100%', height: '100%' }}>
              <img src={pillImg} />
              <img src={workerImg} />
            </div>
          </div>
          {/* Power bowl 1 */}
          <div style={{ height: '50%' }}>
            <div id="1" onClick={this.handleClick} style={{ width: '100%', height: '100%' }}>
            </div>
          </div>
        </div>
        <div style={{ display: 'inline-block', width: '50%', height: '100%' }}>
          <div style={{ height: '25%' }}>
          </div>
          {/* Power bowl 3 */}
          <div id="3" onClick={this.handleClick} style={{ height: '50%' }}>
          </div>
          <div style={{ height: '25%' }}>
          </div>
        </div>
      </div>
    )
  }
}

class ShovelTrack extends Component {
  static propTypes = {
    level: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
  }

  handleClick = (e) => {
    this.props.onClick(e.target.id)
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
        <div style={{ flexGrow: 1, display: 'flex', alignItems: 'flex-stretch' }}>
          <div id="3" onClick={this.handleClick} style={{ width: '37%' }}>
            {/* Token goes here on level 3 */}
          </div>
        </div>
        <div style={{ flexGrow: 1, display: 'flex', alignItems: 'flex-stretch' }}>
          <div id="2" onClick={this.handleClick} style={{ width: '37%' }}>
            {/* Token goes here on level 2 */}
          </div>
        </div>
        <div style={{ flexGrow: 1, display: 'flex', alignItems: 'flex-stretch' }}>
          <div id="1" onClick={this.handleClick} style={{ width: '37%' }}>
            {/* Token goes here on level 1 */}
          </div>
        </div>
      </div>
    )
  }
}

class BuildingDepot extends Component {
  static propTypes = {
    villageCount: PropTypes.number.isRequired,
    tradePostCount: PropTypes.number.isRequired,
    templeCount: PropTypes.number.isRequired,
    strongholdCount: PropTypes.number.isRequired,
    sanctuaryCount: PropTypes.number.isRequired,

    onVillageDepotClick: PropTypes.func.isRequired,
    onTradepostDepotClick: PropTypes.func.isRequired,
    onTempleDepotClick: PropTypes.func.isRequired,
    onStrongholdDepotClick: PropTypes.func.isRequired,
    onStrongholdActionClick: PropTypes.func.isRequired,
    onSanctuaryDepotClick: PropTypes.func.isRequired,
  }

  handleVillageDepotClick = (id) => {
    this.props.onVillageDepotClick(id)
  }

  handleTradePostDepotClick = (id) => {
    this.props.onTradepostDepotClick(id)
  }

  handleTempleDepotClick = (id) => {
    this.props.onTempleDepotClick(id)
  }

  handleStrongholdDepotClick = () => {
    this.props.onStrongholdDepotClick()
  }

  handleStrongholdActionClick = () => {
    this.props.onStrongholdActionClick()
  }

  handleSanctuaryDepotClick = () => {
    this.props.onSanctuaryDepotClick()
  }

  render() {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-stretch' }}>
        {/* Top row */}
        <div style={{ height: '40%', display: 'flex' }}>
          <div style={{ width: '36%' }}>
            {/* Stronghold */}
            <div style={{ height: '2%' }}>
            </div>
            <div style={{ height: '79%' }}>
              <StrongholdDepot
                count={this.props.strongholdCount}
                onStrongholdDepotClick={this.handleStrongholdDepotClick}
                onActionClick={this.handleStrongholdActionClick}
              />
            </div>
          </div>
          <div style={{ width: '21.5%' }}>
          </div>
          <div style={{ width: '18.5%' }}>
            <div style={{ height: '13%' }}>
            </div>
            {/* Sanctuary */}
            <div style={{ height: '58%' }}>
              <SanctuaryDepot
                count={this.props.sanctuaryCount}
                onClick={this.handleSanctuaryDepotClick}
              />
            </div>
          </div>
        </div>
        {/* Middle row */}
        <div style={{ height: '40%', display: 'flex' }}>
          <div style={{ width: '35.5%' }}>
            <div style={{ height: '6%' }}>
            </div>
            {/* Tradeposts */}
            <div style={{ height: '72%' }}>
              <TradePostDepot
                count={this.props.tradePostCount}
                onClick={this.handleTradePostDepotClick}
              />
            </div>
          </div>
          <div style={{ width: '23%' }}>
          </div>
          <div style={{ width: '43%' }}>
            <div style={{ height: '9%' }}>
            </div>
            {/* Temple */}
            <div style={{ height: '64%' }}>
              <TempleDepot
                count={this.props.templeCount}
                onClick={this.handleTempleDepotClick}
              />
            </div>
          </div>
        </div>
        {/* Bottom row */}
        <div style={{ height: '20%', display: 'flex' }}>
          <div style={{ width: '8.5%' }}>
          </div>
            {/* Village */}
          <div style={{ width: '70%', height: '92%', }}>
            <VillageDepot
              count={this.props.villageCount}
              onClick={this.handleVillageDepotClick}
            />
          </div>
        </div>
      </div>
    )
  }
}

class DragAndDropDepot extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      // the dom element being dragged, if any
      draggedElement: {},
    }
  }

  /** This should be overwritten by the child class */
  get buildingType() {
    throw new Error('buildingType getter not implemented in child class of DragAndDropDepot')
  }

  handleClick = (e) => {
    this.props.onClick(e.target.id)
  }

  handleDragStart = (e) => {
    const data = {
      type: this.buildingType,
      id: e.target.id,
    }

    e.dataTransfer.setData('application/json', JSON.stringify(data))
    // make the element somewhat transparent
    e.target.style.opacity = 0.5
    this.setState({
      draggedElement: e.target
    })
  }

  handleDragEnd = (e) => {
    // make the transparent element opaque
    this.state.draggedElement.style.opacity = 1
    this.setState({
      draggedElement: {},
    })
  }

  render() {
    throw new Error('render method not implemented in child class of DragAndDropDepot')
    return
  }
}

class VillageDepot extends DragAndDropDepot {
  static propTypes = DragAndDropDepot.propTypes

  get buildingType() {
    return 'village'
  }

  getVillages = () => {
    const tileWidth = '10%'
    const offset = '3%'
    const villages = []

    for (let i = 0; i < 8; i += 1) {
      villages.push(
        <div
          key={i}
          onClick={this.handleClick}
          style={{ width: tileWidth, display: 'flex', alignItems: 'center', }}
        >
          {this.props.count + i >= 8 &&
            <img
              id={i}
              src={villageImg}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
              }}
              onDragEnd={this.handleDragEnd}
              onDragStart={this.handleDragStart}
            />
          }
        </div>
      )
    }

    return villages
  }

  render() {
    const tileWidth = '10%'
    const offset = '3%'
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
        }}
      >
        {this.getVillages()}
      </div>
    )
  }
}

class TradePostDepot extends DragAndDropDepot {
  static propTypes = DragAndDropDepot.propTypes

  get buildingType() {
    return 'tradePost'
  }

  getTradePosts = () => {
    const numTradeposts = 4
    const tradePosts = []
    const tileWidth = '20.5%'

    for (let i = 0; i < numTradeposts; i += 1) {
      tradePosts.push(
        <div
          key={i}
          id={i}
          onClick={this.handleClick}
          style={{
            width: tileWidth,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {this.props.count + i >= 4 &&
            <img
              id={i}
              src={tradePostImg}
              style={{ maxWidth: '100%', maxHeight: '100%', }}
              onDragEnd={this.handleDragEnd}
              onDragStart={this.handleDragStart}
            />
          }
        </div>
      )
    }

    return tradePosts
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%'
        }}
      >
        {this.getTradePosts()}
      </div>
    )
  }
}

class TempleDepot extends DragAndDropDepot {
  static propTypes = DragAndDropDepot.propTypes

  get buildingType() {
    return 'temple'
  }

  getTemples = () => {
    const numTemples = 3
    const temples = []
    const tileWidth = `${100 / numTemples}%`

    for (let i = 0; i < numTemples; i += 1) {
      temples.push(
        <div
          key={i}
          id={i}
          onClick={this.handleClick}
          style={{
            width: tileWidth,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {this.props.count + i >= 3 &&
            <img
              id={i}
              src={templeImg}
              style={{
                maxWidth: '80%',
                maxHeight: '80%',
              }}
              onDragEnd={this.handleDragEnd}
              onDragStart={this.handleDragStart}
            />
          }
        </div>
      )
    }

    return temples
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%'
        }}
      >
        {this.getTemples()}
      </div>
    )
  }
}

class StrongholdDepot extends DragAndDropDepot {
  // TODO: can we simplify the prop names?
  static propTypes = {
    onStrongholdDepotClick: PropTypes.func.isRequired,
    onActionClick: PropTypes.func.isRequired,
  }

  get buildingType() {
    return 'stronghold'
  }

  handleStrongholdClick = () => {
    this.props.onStrongholdDepotClick()
  }

  handleActionClick = () => {
    this.props.onActionClick()
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-stretch',
          width: '100%',
          height: '100%'
        }}
      >
        <div
          onClick={this.handleStrongholdClick}
          style={{
            width: '48%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {this.props.count >= 1 &&
            <img
              id="0"
              src={strongholdImg}
              style={{ maxWidth: '100%', maxHeight: '100%', }}
              onDragEnd={this.handleDragEnd}
              onDragStart={this.handleDragStart}
            />
          }
        </div>
        <div style={{ width: '10%' }}>
        </div>
        <div onClick={this.handleActionClick} style={{ width: '42%' }}>
          <div style={{ height: '9%' }}>
          </div>
          <div style={{ height: '86%' }}>
            {/* Action space */}
          </div>
        </div>
      </div>
    )
  }
}

class SanctuaryDepot extends DragAndDropDepot {
  static propTypes = DragAndDropDepot.propTypes

  get buildingType() {
    return 'sanctuary'
  }

  render() {
    return (
      <div
        onClick={this.handleClick}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {this.props.count >= 1 &&
          <img
            id="0"
            src={sanctuaryImg}
            style={{ maxWidth: '100%', maxHeight: '100%', }}
            onDragEnd={this.handleDragEnd}
            onDragStart={this.handleDragStart}
          />
        }
      </div>
    )
  }
}

class ShippingTrack extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  }

  handleClick = (e) => {
    this.props.onClick(e.target.id)
  }

  render() {
    return (
      <div style={{ display: 'flex', alignItems: 'flex-stretch', width: '100%', height: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '25%' }}>
          <div id="0" onClick={this.handleClick} style={{ height: '47%' }}>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '25%' }}>
          <div id="1" onClick={this.handleClick} style={{ height: '47%' }}>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '25%' }}>
          <div id="2" onClick={this.handleClick} style={{ height: '47%' }}>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '25%' }}>
          <div id="3" onClick={this.handleClick} style={{ height: '47%' }}>
          </div>
        </div>
      </div>
    )
  }
}
