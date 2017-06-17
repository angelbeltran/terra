import React, { Component } from 'react';
import PropTypes from 'prop-types'

import pillImg from '../img/pill.png'
//import workerImg from '../img/worker.png'
import villageImg from '../img/village_black.png'
import tradePostImg from '../img/tradepost_black.png'
import templeImg from '../img/temple_black.png'
import strongholdImg from '../img/stronghold_black.png'
import sanctuaryImg from '../img/sanctuary_black.png'
import actionTokenImg from '../img/action_token.png'

// TODO: replace tradepost with tradePost
// TODO: remove unused static variables

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
    position: 'relative', // TODO: Do we need this/
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
        <div
          style={{
            /* PlayerBoard.BODY_STYLE */
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
        >
          {/* Top part of board */}
          {/* Power bowls */}
          <div
            style={{
              position: 'absolute',
              top: '3.5%',
              left: '3.5%',
              height: '44.2%',
              width: '41.8%',
              display: 'inline-block',
              verticalAlign: 'top',
              // border: '2px solid blue',
            }}
          >
            {/* Inner div that contains the bowls */}
            <PowerBowls
              onClick={this.handlePowerBowlClick}
              bowl1Count={2}
              bowl2Count={4}
              bowl3Count={6}
            />
          </div>
          {/* Terraforming */}
          <div
            style={{
              position: 'absolute',
              top: '18.5%',
              left: '81.5%',
              width: '13.3%',
              height: '22.8%',
              // border: '2px solid blue',
              verticalAlign: 'top',
            }}
          >
            <ShovelTrack
              level={1}
              onClick={this.handleShovelTrackClick}
            />
          </div>

          {/* Bottom part of board */}
          {/* Buildings */}
          <div
            style={{
              position: 'absolute',
              top: '52.2%',
              left: '10%',
              height: '42.2%',
              width: '51.3%',
              display: 'inline-block',
              verticalAlign: 'top',
              // border: '2px solid green',
            }}
          >
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
          {/* Shipping & abilities */}
          <div
            style={{
              position: 'absolute',
              top: '56%',
              left: '76.5%',
              height: '13.6%',
              width: '17.6%',
            }}
          >
            <ShippingTrack onClick={this.handleShippingTrackClick} />
          </div>
        </div>
      </div>
    )
  }
}

class PowerBowls extends Component {
  static propTypes = {
    bowl1Count: PropTypes.number,
    bowl2Count: PropTypes.number,
    bowl3Count: PropTypes.number,
    onClick: PropTypes.func.isRequired,
  }

  static defaultProps = {
    bowl1Count: 4,
    bowl2Count: 4,
    bowl3Count: 4,
  }

  handleClick = (e) => {
    this.props.onClick(e.target.id)
  }

  getPills(bowlNumber) {
    const pills = []
    const count = this.props[`bowl${bowlNumber}Count`]

    for (let i = 0; i < count; i += 1) {
      pills.push(
        <img
          key={i}
          src={pillImg}
          style={{
            width: '25%',
            height: 'auto',
          }}
          alt=""
        />
      )
    }

    return pills
  }

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        {/* Power bowl 2 */}
        <div
          id="2"
          onClick={this.handleClick}
          style={{
            position: 'absolute',
            left: '10%',
            width: '30%',
            height: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            flexWrap: 'wrap',
          }}
        >

          {this.getPills(2)}

        </div>

        {/* Power bowl 1*/}
        <div
          id="1"
          style={{
            position: 'absolute',
            top: '50%',
            left: '10%',
            width: '30%',
            height: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            flexWrap: 'wrap',
          }}
          onClick={this.handleClick}
        >

          {this.getPills(1)}

        </div>

        {/* Power bowl 3 */}
        <div
          id="3"
          style={{
            position: 'absolute',
            top: '26%',
            left: '60%',
            width: '30%',
            height: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            flexWrap: 'wrap',
          }}
          onClick={this.handleClick}
        >

          {this.getPills(3)}

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
    //const topHeight = 32
    //const middleBuffer = 10.7
    const middleHeight = 27.8
    const bottomBuffer = 10.5
    const bottomHeight = 18.5

    /*
    const topRow = {
      
    }
    */
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        {/* Top Row */}
        <div
          style={{
            position: 'absolute',
            width: '17.1%',
            height: '32.3%',
          }}
        >
          <StrongholdDepot
            count={this.props.strongholdCount}
            onClick={this.handleStrongholdDepotClick}
          />
        </div>
        <div
          style={{
            position: 'absolute',
            top: '2.8%',
            left: '24.9%',
            width: '14.6%',
            height: '27.8%',
          }}
        >
          <StrongholdActionSpace
            placed={false}
            onClick={this.handleStrongholdActionClick}
          />
        </div>
        <div
          style={{
            position: 'absolute',
            top: '5.4%',
            left: '58%',
            width: '17.7%',
            height: '22.1%'
          }}
        >
          <SanctuaryDepot
            count={this.props.sanctuaryCount}
            onClick={this.handleSanctuaryDepotClick}
          />
        </div>

        {/* Middle Row */}
        <div
          style={{
            position: 'absolute',
            top: '43.2%',
            width: '35%',
            height: '27.8%',
          }}
        >
          <TradePostDepot
            count={this.props.tradePostCount}
            onClick={this.handleTradePostDepotClick}
          />
        </div>

        <div
          style={{
            position: 'absolute',
            top: '44.3%',
            right: '0%',
            width: '41.7%',
            height: '24.9%',
          }}
        >
          <TempleDepot
            count={this.props.templeCount}
            onClick={this.handleTempleDepotClick}
          />
        </div>

        {/* Bottom Row */}
        <div
          style={{
            position: 'relative',
            top: `${42.7 + middleHeight + bottomBuffer}%`,
            left: '8.4%',
            width: '70.5%',
            height: `${bottomHeight}%`,
          }}
        >
          <VillageDepot
            count={this.props.villageCount}
            onClick={this.handleVillageDepotClick}
          />
        </div>
      </div>
    )
  }
}

/* eslint-disable react/require-render-return */
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
    const style = this.state.draggedElement.style

    this.setState({
      draggedElement: {},
    }, () => {
      style.opacity = 1
    })
  }

  render() {
    throw new Error('render method not implemented in child class of DragAndDropDepot')
  }
}
/* eslint-enable react/require-render-return */

class StrongholdDepot extends DragAndDropDepot {
  // TODO: can we simplify the prop names?
  static propTypes = {
    count: PropTypes.number,
    onClick: PropTypes.func.isRequired,
  }

  static defaultProps = {
    count: 0,
  }

  get buildingType() {
    return 'stronghold'
  }

  render() {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
        onClick={this.props.onClick}
      >
        {this.props.count >= 1 &&
          <img
            id="0"
            src={strongholdImg}
            alt=""
            style={{ maxWidth: '100%', maxHeight: '100%', }}
            onDragEnd={this.handleDragEnd}
            onDragStart={this.handleDragStart}
          />
        }
      </div>
    )
  }
}

class StrongholdActionSpace extends DragAndDropDepot {
  
  static propTypes = {
    placed: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
  }

  static defaultProps = {
    placed: false
  }

  get buildingType() {
    return 'strongholdAction'
  }

  handleClick = () => {
    this.props.onClick()
  }

  render() {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
        }}
        onClick={this.handleClick}
      >
        {this.props.placed &&
          <img
            src={actionTokenImg}
            alt=""
            style={{
              position: 'absolute',
              top: '-4%',
              left: '-4%',
              width: '108%',
              height: 'auto',
            }}
            onDragEnd={this.handleDragEnd}
            onDragStart={this.handleDragStart}
          />
        }
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
            alt=""
            style={{
              width: '75%',
              height: 'auto',
            }}
            onDragEnd={this.handleDragEnd}
            onDragStart={this.handleDragStart}
          />
        }
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
              alt=""
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
    const bufferWidth = 2.5
    const totalBufferSpace = (numTemples - 1) * bufferWidth
    const tileWidth = ((100 - totalBufferSpace) / numTemples)

    // const tileWidth = `${100 / numTemples}%`

    for (let i = 0; i < numTemples; i += 1) {
      temples.push(
        <div
          key={i}
          id={i}
          onClick={this.handleClick}
          style={{
            position: 'absolute',
            left: `${(tileWidth + bufferWidth) * i}%`,
            width: `${tileWidth}%`,
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {this.props.count + i >= 3 &&
            <img
              id={i}
              src={templeImg}
              alt=""
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
          width: '100%',
          height: '100%'
        }}
      >
        {this.getTemples()}
      </div>
    )
  }
}

class VillageDepot extends DragAndDropDepot {
  static propTypes = DragAndDropDepot.propTypes

  get buildingType() {
    return 'village'
  }

  getVillages = () => {
    const tileWidth = '10%'
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
              alt=""
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
